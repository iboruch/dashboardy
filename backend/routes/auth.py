from fastapi import APIRouter, HTTPException
from models.schemas import AuthToken, OAuthCallback
from services.oauth import oauth_service
from datetime import datetime, timedelta
import os

router = APIRouter()

# Store for demo (use database in production)
token_store = {}

@router.get("/url/{service}")
async def get_auth_url(service: str):
    """Get OAuth URL for a specific service"""
    try:
        if service == "google":
            url, state = oauth_service.get_google_auth_url()
        elif service == "spotify":
            url, state = oauth_service.get_spotify_auth_url()
        elif service == "microsoft":
            url, state = oauth_service.get_microsoft_auth_url()
        else:
            raise HTTPException(status_code=400, detail="Unknown service")
        
        # Store state for verification (in production, use database)
        token_store[state] = {"service": service, "timestamp": datetime.utcnow()}
        
        return {"auth_url": url, "state": state}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/callback")
async def handle_callback(callback: OAuthCallback):
    """Handle OAuth callback"""
    try:
        service = callback.service
        code = callback.code
        
        if service == "google":
            tokens = oauth_service.exchange_google_code(code)
        elif service == "spotify":
            tokens = oauth_service.exchange_spotify_code(code)
        elif service == "microsoft":
            tokens = oauth_service.exchange_microsoft_code(code)
        else:
            raise HTTPException(status_code=400, detail="Unknown service")
        
        # Calculate expiry
        expires_in = tokens.get("expires_in", 3600)
        expires_at = int((datetime.utcnow() + timedelta(seconds=expires_in)).timestamp() * 1000)
        
        return AuthToken(
            access_token=tokens.get("access_token"),
            refresh_token=tokens.get("refresh_token"),
            expires_at=expires_at,
            service=service
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/refresh")
async def refresh_token(service: str, refresh_token: str):
    """Refresh OAuth token"""
    try:
        if service == "google":
            # Implement refresh logic
            pass
        elif service == "spotify":
            # Implement refresh logic
            pass
        
        raise HTTPException(status_code=501, detail="Refresh not implemented for this service")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/logout")
async def logout(service: str):
    """Logout from a service"""
    return {"message": f"Logged out from {service}"}
