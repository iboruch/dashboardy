from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from routes import auth, calendar, spotify, linear

# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Dashboardy Backend Starting...")
    yield
    # Shutdown
    print("👋 Dashboardy Backend Shutting down...")

# Create FastAPI app
app = FastAPI(
    title="Dashboardy API",
    description="PWA Dashboard with OAuth integrations",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:4200"),
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(calendar.router, prefix="/api/calendar", tags=["calendar"])
app.include_router(spotify.router, prefix="/api/spotify", tags=["spotify"])
app.include_router(linear.router, prefix="/api/linear", tags=["linear"])

# Health check endpoint
@app.get("/api/health")
async def health():
    return {"status": "ok", "message": "Dashboardy Backend is running"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": "Dashboardy API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "True") == "True"
    )
