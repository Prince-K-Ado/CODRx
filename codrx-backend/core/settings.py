import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta

# templates
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        # optional: where your project-level templates live
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,   # look for <app>/templates/ as well
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# -----------------------------------------------------------------------------
# BASE DIRECTORY & ENVIRONMENT VARIABLES
# -----------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

if ENV_PATH.exists():
    load_dotenv(ENV_PATH)
else:
    print("⚠️  Warning: .env file not found at", ENV_PATH)

# -----------------------------------------------------------------------------
# CORE SETTINGS
# -----------------------------------------------------------------------------
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "insecure-default-secret-key")
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# -----------------------------------------------------------------------------
# APPLICATIONS
# -----------------------------------------------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",

    # Local apps
    'accounts',
    # "api",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

WSGI_APPLICATION = "core.wsgi.application"

# -----------------------------------------------------------------------------
# DATABASE
# -----------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# -----------------------------------------------------------------------------
# PASSWORD VALIDATION
# -----------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -----------------------------------------------------------------------------
# INTERNATIONALIZATION
# -----------------------------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# -----------------------------------------------------------------------------
# STATIC FILES
# -----------------------------------------------------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# -----------------------------------------------------------------------------
# DEFAULT PRIMARY KEY FIELD TYPE
# -----------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# -----------------------------------------------------------------------------
# CORS / CSRF CONFIGURATION (Next.js 3000 <-> Django 8000)
# -----------------------------------------------------------------------------
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
ALLOWED_HOSTS += ["localhost", "127.0.0.1"]

SESSION_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = False

# -----------------------------------------------------------------------------
# REST FRAMEWORK + JWT AUTH
# -----------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_COOKIE": "codrx_access_token",  # optional if using cookies
    "AUTH_COOKIE_SECURE": False,
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_SAMESITE": "Lax",
}

# -----------------------------------------------------------------------------
# reCAPTCHA CONFIG
# -----------------------------------------------------------------------------
RECAPTCHA_SECRET = os.getenv("RECAPTCHA_SECRET", "")
if not RECAPTCHA_SECRET:
    print("⚠️  Missing RECAPTCHA_SECRET in environment!")

# -----------------------------------------------------------------------------
# LOGGING (helps debug API requests)
# -----------------------------------------------------------------------------
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {
        "handlers": ["console"],
        "level": "INFO" if not DEBUG else "DEBUG",
    },
}
