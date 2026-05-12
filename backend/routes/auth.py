from fastapi import APIRouter, HTTPException
from models.schemas import AuthToken, OAuthCallback
from services.oauth import oauth_service
from datetime import datetime, timedelta
import os

router = APIRouter()

# In-memory state store for local development. Use persistent session storage in production.
token_store = {}

SUPPORTED_OAUTH_SERVICES = {"google", "spotify", "microsoft"}

REQUIRED_ENV = {
    "google": ("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"),
    "spotify": ("SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"),
    "microsoft": ("MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_SECRET"),
}


def ensure_supported_provider(service: str) -> None:
    if service == "linear":
        raise HTTPException(
            status_code=501,
            detail="Linear is represented as an API-key integration in this demo backend; OAuth is not implemented yet.",
        )
    if service not in SUPPORTED_OAUTH_SERVICES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported OAuth service '{service}'. Supported services: {', '.join(sorted(SUPPORTED_OAUTH_SERVICES))}.",
        )


def ensure_provider_configured(service: str) -> None:
    missing = [key for key in REQUIRED_ENV[service] if not os.getenv(key)]
    if missing:
        raise HTTPException(
            status_code=503,
            detail=f"{service.title()} OAuth is not configured. Add {', '.join(missing)} to backend/.env or use frontend demo mode.",
        )


@router.get("/url/{service}")
async def get_auth_url(service: str):
    """Get OAuth URL for a specific service"""
    try:
        ensure_supported_provider(service)
        ensure_provider_configured(service)

        if service == "google":
            url, state = oauth_service.get_google_auth_url()
        elif service == "spotify":
            url, state = oauth_service.get_spotify_auth_url()
        else:
            url, state = oauth_service.get_microsoft_auth_url()

        token_store[state] = {"service": service, "timestamp": datetime.utcnow()}
        return {"auth_url": url, "state": state}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Could not create {service} OAuth URL: {e}")


@router.post("/callback")
async def handle_callback(callback: OAuthCallback):
    """Handle OAuth callback"""
    try:
        service = callback.service
        code = callback.code
        ensure_supported_provider(service)
        ensure_provider_configured(service)

        if service == "google":
            tokens = oauth_service.exchange_google_code(code)
        elif service == "spotify":
            tokens = oauth_service.exchange_spotify_code(code)
        else:
            tokens = oauth_service.exchange_microsoft_code(code)

        expires_in = tokens.get("expires_in", 3600)
        expires_at = int((datetime.utcnow() + timedelta(seconds=expires_in)).timestamp() * 1000)

        return AuthToken(
            access_token=tokens.get("access_token"),
            refresh_token=tokens.get("refresh_token"),
            expires_at=expires_at,
            service=service
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"OAuth callback failed for {callback.service}: {e}")


@router.post("/refresh")
async def refresh_token(service: str, refresh_token: str):
    """Refresh OAuth token"""
    ensure_supported_provider(service)
    raise HTTPException(
        status_code=501,
        detail="Token refresh is not implemented in this portfolio demo. Re-authenticate the provider instead.",
    )


@router.post("/logout")
async def logout(service: str):
    """Logout from a service"""
    return {"message": f"Local session cleared for {service}. Provider revocation is not implemented in this demo."}
