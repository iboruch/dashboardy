import requests
from typing import Optional, List
import os
from dotenv import load_dotenv

load_dotenv()

class GoogleCalendarService:
    """Service for Google Calendar API"""
    
    API_URL = "https://www.googleapis.com/calendar/v3"
    
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
    
    def get_events(self, calendar_id: str = "primary") -> List[dict]:
        """Get calendar events"""
        url = f"{self.API_URL}/calendars/{calendar_id}/events"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json().get("items", [])
    
    def create_event(self, calendar_id: str, event: dict) -> dict:
        """Create a calendar event"""
        url = f"{self.API_URL}/calendars/{calendar_id}/events"
        response = requests.post(url, json=event, headers=self.headers)
        response.raise_for_status()
        return response.json()


class SpotifyService:
    """Service for Spotify API"""
    
    API_URL = "https://api.spotify.com/v1"
    
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
    
    def get_currently_playing(self) -> Optional[dict]:
        """Get currently playing track"""
        url = f"{self.API_URL}/me/player/currently-playing"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 204:
            return None
        response.raise_for_status()
        return response.json()
    
    def get_playlists(self) -> List[dict]:
        """Get user playlists"""
        url = f"{self.API_URL}/me/playlists"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json().get("items", [])


class MicrosoftGraphService:
    """Service for Microsoft Graph API (Outlook Calendar)"""
    
    API_URL = "https://graph.microsoft.com/v1.0"
    
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
    
    def get_events(self) -> List[dict]:
        """Get calendar events"""
        url = f"{self.API_URL}/me/calendarview"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json().get("value", [])
    
    def create_event(self, event: dict) -> dict:
        """Create a calendar event"""
        url = f"{self.API_URL}/me/events"
        response = requests.post(url, json=event, headers=self.headers)
        response.raise_for_status()
        return response.json()


class LinearService:
    """Service for Linear API"""
    
    API_URL = "https://api.linear.app/graphql"
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "Authorization": api_key,
            "Content-Type": "application/json"
        }
    
    def get_issues(self, status: Optional[str] = None) -> List[dict]:
        """Get issues"""
        query = """
        {
            viewer {
                issues(first: 50) {
                    nodes {
                        id
                        title
                        description
                        state {
                            name
                        }
                        priority
                        assignee {
                            name
                        }
                        dueDate
                    }
                }
            }
        }
        """
        data = {"query": query}
        response = requests.post(self.API_URL, json=data, headers=self.headers)
        response.raise_for_status()
        result = response.json()
        return result.get("data", {}).get("viewer", {}).get("issues", {}).get("nodes", [])
    
    def update_issue(self, issue_id: str, update: dict) -> dict:
        """Update an issue"""
        mutation = f"""
        mutation {{
            issueUpdate(id: "{issue_id}", input: {{
                title: "{update.get('title', '')}"
                description: "{update.get('description', '')}"
            }}) {{
                issue {{
                    id
                    title
                    description
                }}
            }}
        }}
        """
        data = {"query": mutation}
        response = requests.post(self.API_URL, json=data, headers=self.headers)
        response.raise_for_status()
        return response.json()
