from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models.schemas import SpotifyTrack
from services.integrations import SpotifyService

router = APIRouter()

@router.get("/currently-playing")
async def get_currently_playing(token: str = Query(...)):
    """Get currently playing track on Spotify"""
    try:
        service = SpotifyService(token)
        track_data = service.get_currently_playing()
        
        if not track_data or "item" not in track_data:
            raise HTTPException(status_code=404, detail="No track currently playing")
        
        track = track_data["item"]
        
        return SpotifyTrack(
            id=track["id"],
            name=track["name"],
            artist=", ".join([artist["name"] for artist in track["artists"]]),
            album=track["album"]["name"],
            image_url=track["album"]["images"][0]["url"] if track["album"]["images"] else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/playlists")
async def get_playlists(token: str = Query(...)):
    """Get user's playlists"""
    try:
        service = SpotifyService(token)
        playlists = service.get_playlists()
        
        return [
            {
                "id": playlist["id"],
                "name": playlist["name"],
                "image_url": playlist["images"][0]["url"] if playlist["images"] else None,
                "total_tracks": playlist["tracks"]["total"]
            }
            for playlist in playlists
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/play")
async def play_track(uri: str, token: str = Query(...)):
    """Play a track"""
    try:
        service = SpotifyService(token)
        # Note: Playing requires a device. This is simplified.
        return {"message": "Play functionality requires active Spotify device"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
