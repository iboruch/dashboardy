import os
import secrets
import requests
from typing import Optional
from datetime import datetime, timedelta
from urllib.parse import urlencode
import jwt
from dotenv import load_dotenv

load_dotenv()

class OAuthService:
    """Unified OAuth service for all providers"""
    
    GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
    GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
    
    SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
    SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
    
    MICROSOFT_AUTH_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
    MICROSOFT_TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token"

    def __init__(self, frontend_url: str = None):
        self.frontend_url = frontend_url or os.getenv("FRONTEND_URL", "http://localhost:4200")
        
    def get_google_auth_url(self, state: str = None) -> str:
        """Get Google OAuth authorization URL"""
        state = state or secrets.token_urlsafe()
        
        params = {
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "redirect_uri": f"{self.frontend_url}/auth/google/callback",
            "response_type": "code",
            "scope": "openid email profile https://www.googleapis.com/auth/calendar",
            "state": state,
            "access_type": "offline",
            "prompt": "consent"
        }
        return f"{self.GOOGLE_AUTH_URL}?{urlencode(params)}", state

    def get_spotify_auth_url(self, state: str = None) -> str:
        """Get Spotify OAuth authorization URL"""
        state = state or secrets.token_urlsafe()
        
        params = {
            "client_id": os.getenv("SPOTIFY_CLIENT_ID"),
            "response_type": "code",
            "redirect_uri": f"{self.frontend_url}/auth/spotify/callback",
            "scope": "user-read-currently-playing playlist-read-private",
            "state": state
        }
        return f"{self.SPOTIFY_AUTH_URL}?{urlencode(params)}", state

    def get_microsoft_auth_url(self, state: str = None) -> str:
        """Get Microsoft OAuth authorization URL"""
        state = state or secrets.token_urlsafe()
        
        params = {
            "client_id": os.getenv("MICROSOFT_CLIENT_ID"),
            "redirect_uri": f"{self.frontend_url}/auth/microsoft/callback",
            "response_type": "code",
            "scope": "Calendars.Read User.Read",
            "state": state,
        }
        return f"{self.MICROSOFT_AUTH_URL}?{urlencode(params)}", state

    def exchange_google_code(self, code: str) -> dict:
        """Exchange Google auth code for tokens"""
        data = {
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": f"{self.frontend_url}/auth/google/callback"
        }
        
        response = requests.post(self.GOOGLE_TOKEN_URL, data=data)
        response.raise_for_status()
        return response.json()

    def exchange_spotify_code(self, code: str) -> dict:
        """Exchange Spotify auth code for tokens"""
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": f"{self.frontend_url}/auth/spotify/callback",
            "client_id": os.getenv("SPOTIFY_CLIENT_ID"),
            "client_secret": os.getenv("SPOTIFY_CLIENT_SECRET"),
        }
        
        response = requests.post(self.SPOTIFY_TOKEN_URL, data=data)
        response.raise_for_status()
        return response.json()

    def exchange_microsoft_code(self, code: str) -> dict:
        """Exchange Microsoft auth code for tokens"""
        data = {
            "client_id": os.getenv("MICROSOFT_CLIENT_ID"),
            "client_secret": os.getenv("MICROSOFT_CLIENT_SECRET"),
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": f"{self.frontend_url}/auth/microsoft/callback"
        }
        
        response = requests.post(self.MICROSOFT_TOKEN_URL, data=data)
        response.raise_for_status()
        return response.json()

    @staticmethod
    def create_jwt_token(data: dict, hours: int = 24) -> str:
        """Create JWT token"""
        payload = data.copy()
        expire = datetime.utcnow() + timedelta(hours=hours)
        payload.update({"exp": expire})
        
        token = jwt.encode(
            payload,
            os.getenv("JWT_SECRET", "change-me"),
            algorithm=os.getenv("JWT_ALGORITHM", "HS256")
        )
        return token

oauth_service = OAuthService()
