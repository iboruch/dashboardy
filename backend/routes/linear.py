from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models.schemas import LinearIssue
from services.integrations import LinearService

router = APIRouter()

@router.get("/issues")
async def get_issues(api_key: str = Query(...), status: Optional[str] = None):
    """Get Linear issues"""
    try:
        service = LinearService(api_key)
        issues = service.get_issues(status)
        
        return [
            LinearIssue(
                id=issue["id"],
                title=issue["title"],
                description=issue.get("description"),
                status=issue.get("state", {}).get("name", "unknown"),
                priority=issue.get("priority", 0),
                assignee=issue.get("assignee", {}).get("name"),
                dueDate=issue.get("dueDate")
            )
            for issue in issues
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/issues/{issue_id}")
async def update_issue(issue_id: str, update: dict, api_key: str = Query(...)):
    """Update a Linear issue"""
    try:
        service = LinearService(api_key)
        updated = service.update_issue(issue_id, update)
        
        issue_data = updated.get("data", {}).get("issueUpdate", {}).get("issue", {})
        
        return LinearIssue(
            id=issue_data.get("id"),
            title=issue_data.get("title"),
            description=issue_data.get("description"),
            status="updated",
            priority=0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/teams")
async def get_teams(api_key: str = Query(...)):
    """Get Linear teams"""
    try:
        return {"teams": []}  # TODO: Implement
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
