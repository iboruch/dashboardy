from fastapi import APIRouter, HTTPException, Query
from typing import List
from models.schemas import CalendarEvent
from services.integrations import GoogleCalendarService, MicrosoftGraphService
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/google/events")
async def get_google_events(token: str = Query(...)):
    """Get Google Calendar events"""
    try:
        service = GoogleCalendarService(token)
        events = service.get_events()
        
        # Convert to our schema
        calendar_events = []
        for event in events:
            start = event.get("start", {}).get("dateTime") or event.get("start", {}).get("date")
            end = event.get("end", {}).get("dateTime") or event.get("end", {}).get("date")
            
            calendar_events.append(CalendarEvent(
                id=event.get("id"),
                title=event.get("summary", "No title"),
                description=event.get("description"),
                start=datetime.fromisoformat(start.replace('Z', '+00:00')) if start else datetime.now(),
                end=datetime.fromisoformat(end.replace('Z', '+00:00')) if end else datetime.now(),
                source="google"
            ))
        
        return calendar_events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/google/events")
async def create_google_event(event: CalendarEvent, token: str = Query(...)):
    """Create a Google Calendar event"""
    try:
        service = GoogleCalendarService(token)
        event_data = {
            "summary": event.title,
            "description": event.description,
            "start": {"dateTime": event.start.isoformat()},
            "end": {"dateTime": event.end.isoformat()},
        }
        
        created = service.create_event("primary", event_data)
        return CalendarEvent(
            id=created.get("id"),
            title=created.get("summary"),
            description=created.get("description"),
            start=datetime.fromisoformat(created.get("start", {}).get("dateTime", "").replace('Z', '+00:00')),
            end=datetime.fromisoformat(created.get("end", {}).get("dateTime", "").replace('Z', '+00:00')),
            source="google"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/microsoft/events")
async def get_microsoft_events(token: str = Query(...)):
    """Get Outlook Calendar events"""
    try:
        service = MicrosoftGraphService(token)
        events = service.get_events()
        
        calendar_events = []
        for event in events:
            start = event.get("start", {}).get("dateTime")
            end = event.get("end", {}).get("dateTime")
            
            if start and end:
                calendar_events.append(CalendarEvent(
                    id=event.get("id"),
                    title=event.get("subject", "No title"),
                    description=event.get("bodyPreview"),
                    start=datetime.fromisoformat(start.replace('Z', '+00:00')),
                    end=datetime.fromisoformat(end.replace('Z', '+00:00')),
                    source="microsoft"
                ))
        
        return calendar_events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/microsoft/events")
async def create_microsoft_event(event: CalendarEvent, token: str = Query(...)):
    """Create an Outlook Calendar event"""
    try:
        service = MicrosoftGraphService(token)
        event_data = {
            "subject": event.title,
            "bodyPreview": event.description,
            "start": {"dateTime": event.start.isoformat()},
            "end": {"dateTime": event.end.isoformat()},
        }
        
        created = service.create_event(event_data)
        return CalendarEvent(
            id=created.get("id"),
            title=created.get("subject"),
            description=created.get("bodyPreview"),
            start=datetime.fromisoformat(created.get("start", {}).get("dateTime", "").replace('Z', '+00:00')),
            end=datetime.fromisoformat(created.get("end", {}).get("dateTime", "").replace('Z', '+00:00')),
            source="microsoft"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
