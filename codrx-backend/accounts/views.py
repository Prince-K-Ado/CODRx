# accounts/views.py
import logging
import os
from typing import Tuple, Dict

import requests
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.utils.html import strip_tags
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer

logger = logging.getLogger(__name__)
User = get_user_model()

# ---------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------

def sanitize(s: str | None) -> str | None:
    """Tiny HIPAA-safe baseline sanitization (strip tags/whitespace)."""
    if s is None:
        return None
    return strip_tags(s).strip()

def verify_recaptcha(token: str | None, remote_ip: str | None = None) -> Tuple[bool, Dict]:
    """
    Verify a v2 Checkbox token with Google.
    Returns (ok, payload). On failure, payload contains error-codes.
    """
    secret = os.getenv("RECAPTCHA_SECRET") or getattr(settings, "RECAPTCHA_SECRET", "")
    if not token or not secret:
        return False, {"success": False, "error-codes": ["missing-token-or-secret"]}

    data = {"secret": secret, "response": token}
    if remote_ip:
        data["remoteip"] = remote_ip

    try:
        r = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data=data,  # x-www-form-urlencoded
            timeout=4,
        )
        payload = r.json() if r.ok else {"success": False, "error-codes": ["http-failure"]}
    except Exception as e:
        logger.exception("reCAPTCHA verify error: %s", e)
        return False, {"success": False, "error-codes": ["exception"]}

    if settings.DEBUG:
        logger.info("reCAPTCHA response: %s", payload)
    return bool(payload.get("success")), payload

def _set_auth_cookies(resp: Response, access: str, refresh: str) -> None:
    """
    Set JWT cookies. In dev (Next proxy), cookies are set on 3000 origin.
    Adjust SameSite/Secure for production as needed.
    """
    # DEV defaults — for prod consider SameSite='None', Secure=True (HTTPS)
    resp.set_cookie(
        "codrx_access_token",
        access,
        httponly=True,
        samesite="Lax",
        secure=False,
        max_age=60 * 60,  # 1 hour
        path="/",
    )
    resp.set_cookie(
        "codrx_refresh_token",
        refresh,
        httponly=True,
        samesite="Lax",
        secure=False,
        max_age=60 * 60 * 24 * 7,  # 7 days
        path="/",
    )

def _clear_auth_cookies(resp: Response) -> None:
    resp.delete_cookie("codrx_access_token", path="/")
    resp.delete_cookie("codrx_refresh_token", path="/")

# ---------------------------------------------------------------------
# Views
# ---------------------------------------------------------------------

class RegisterView(APIView):
    """
    POST /api/auth/register
    Body: { email, username (optional), password, recaptchaToken }
    """
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def post(self, request):
        token = request.data.get("recaptchaToken")
        ok, rc = verify_recaptcha(token, request.META.get("REMOTE_ADDR"))
        if not ok:
            return Response(
                {"detail": "recaptcha_failed", "recaptcha": rc},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Accept email as username if omitted
        email = sanitize(request.data.get("email"))
        username = sanitize(request.data.get("username") or email)
        password = request.data.get("password") or ""

        data = {"email": email, "username": username, "password": password}
        serializer = RegisterSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        return Response({"detail": "registered", "id": user.id, "email": user.email}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    POST /api/auth/login
    Body: { username, password, recaptchaToken }
    Returns 200 and sets JWT cookies via Set-Cookie.
    """
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def post(self, request):
        # Debug visibility of incoming data (optional)
        # print("CT:", request.headers.get("Content-Type"))
        # print("RAW:", request.body[:200])
        # print("DATA:", request.data)

        username = sanitize(request.data.get("username"))
        password = request.data.get("password") or ""
        token = request.data.get("recaptchaToken")

        if not username or not password:
            return Response({"detail": "missing-credentials"}, status=status.HTTP_400_BAD_REQUEST)

        ok, rc = verify_recaptcha(token, request.META.get("REMOTE_ADDR"))
        if not ok:
            return Response(
                {"detail": "recaptcha_failed", "recaptcha": rc},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"detail": "invalid-credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        resp = Response({"detail": "ok"}, status=status.HTTP_200_OK)
        resp.set_cookie(
            "codrx_access_token", str(access), httponly=True, samesite="Lax", secure=False, path="/",
        )
        resp.set_cookie(
            "codrx_refresh_token", str(refresh), httponly=True, samesite="Lax", secure=False, path="/",
        )
        _set_auth_cookies(resp, access, str(refresh))
        return resp


class LogoutView(APIView):
    """
    POST /api/auth/logout
    Clears cookies regardless of auth state.
    """
    permission_classes = [AllowAny]

    def post(self, _request):
        resp = Response({"detail": "logged-out"}, status=status.HTTP_200_OK)
        resp.delete_cookie("codrx_access_token", path="/")
        resp.delete_cookie("codrx_refresh_token", path="/")
        resp.delete_cookie("sessionid", path="/")
        _clear_auth_cookies(resp)
        return resp

