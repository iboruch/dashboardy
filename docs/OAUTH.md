# OAuth Guide

Dashboardy includes provider integration structure, but demo mode is the default. Do not commit real provider credentials.

## Current Provider Status

- Google: OAuth URL and callback exchange structure
- Spotify: OAuth URL and callback exchange structure
- Microsoft: OAuth URL and callback exchange structure
- Linear: API-key route examples; full OAuth flow is not implemented yet

## Local Callback URLs

- Google: `http://localhost:4200/auth/google/callback`
- Spotify: `http://localhost:4200/auth/spotify/callback`
- Microsoft: `http://localhost:4200/auth/microsoft/callback`
- Linear: `http://localhost:4200/auth/linear/callback` planned

## Basic Flow

1. Frontend asks FastAPI for a provider authorization URL.
2. User authorizes the provider.
3. Provider redirects to the frontend callback URL with a code.
4. Frontend passes the code to the backend.
5. Backend exchanges the code for provider tokens.
6. App uses tokens to request provider data.

## Security Notes

- Use HTTPS outside local development.
- Persist and validate OAuth state values server-side.
- Store tokens server-side with encryption at rest.
- Implement refresh-token rotation and provider disconnect/revocation.
- Keep long-lived secrets out of frontend code.
