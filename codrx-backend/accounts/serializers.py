from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils.html import strip_tags

def safe_str(v: str) -> str:
    # Simple server-side sanitization (defense-in-depth)
    return strip_tags(v).strip()

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def validate_username(self, v):
        return safe_str(v)

    def validate_email(self, v):
        return safe_str(v)

    def create(self, data):
        # Django will hash with bcrypt per PASSWORD_HASHERS
        user = User.objects.create_user(
            username=data["username"],
            email=data["email"],
            password=data["password"]
        )
        return user
