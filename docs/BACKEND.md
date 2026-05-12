# Backend Guide

The backend is a FastAPI app that exposes health, auth, calendar, Spotify, and Linear route groups.

## Run

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

## Important Endpoints

- `GET /api/health` - service health and provider configuration summary
- `GET /docs` - Swagger/OpenAPI documentation
- `GET /api/auth/url/{service}` - OAuth authorization URL for configured providers
- `POST /api/auth/callback` - OAuth callback exchange
- `GET /api/calendar/{provider}/events` - calendar examples requiring tokens
- `GET /api/spotify/currently-playing` - Spotify example requiring a token
- `GET /api/linear/issues` - Linear example requiring an API key

## Tests

```bash
cd backend
pytest
```

The current test suite includes a health endpoint smoke test so CI can verify the FastAPI app imports and responds.

## Demo and Integration Boundaries

The backend can boot without OAuth credentials. Real provider endpoints return clearer configuration errors when required environment variables are missing.

Production work should add persistent user/session storage, server-side token encryption, refresh-token handling, provider disconnect/revocation, request logging, and broader route tests.
