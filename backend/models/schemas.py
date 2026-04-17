from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuthToken(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    expires_at: Optional[int] = None
    service: str

class CalendarEvent(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    start: datetime
    end: datetime
    source: str

class SpotifyTrack(BaseModel):
    id: str
    name: str
    artist: str
    album: str
    image_url: Optional[str] = None

class LinearIssue(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    status: str
    priority: int
    assignee: Optional[str] = None
    dueDate: Optional[datetime] = None

class OAuthCallback(BaseModel):
    service: str
    code: str
    state: Optional[str] = None
