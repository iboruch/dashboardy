# OAuth Guide / Przewodnik OAuth

## English

### Supported providers

- Google
- Spotify
- Microsoft
- Linear

### Local callback URLs

- Google: `http://localhost:4200/auth/google/callback`
- Spotify: `http://localhost:4200/auth/spotify/callback`
- Microsoft: `http://localhost:4200/auth/microsoft/callback`
- Linear: `http://localhost:4200/auth/linear/callback`

### Basic flow

1. frontend asks backend for auth URL
2. user is redirected to provider
3. provider redirects back with code
4. backend exchanges code for token
5. frontend uses token/session to load data

### Security notes

- never commit real OAuth secrets
- use HTTPS in production
- exact redirect URI matching matters
- long-lived secrets should not live in frontend code

## Polski

### Wspierani providerzy

- Google
- Spotify
- Microsoft
- Linear

### Callback URL-e lokalne

- Google: `http://localhost:4200/auth/google/callback`
- Spotify: `http://localhost:4200/auth/spotify/callback`
- Microsoft: `http://localhost:4200/auth/microsoft/callback`
- Linear: `http://localhost:4200/auth/linear/callback`

### Podstawowy flow

1. frontend pyta backend o auth URL
2. użytkownik trafia do providera
3. provider odsyła z kodem
4. backend wymienia kod na token
5. frontend używa tokenu/sesji do załadowania danych

### Uwagi bezpieczeństwa

- nie commituj prawdziwych sekretów OAuth
- w produkcji używaj HTTPS
- redirect URI musi zgadzać się dokładnie
- długowieczne sekrety nie powinny żyć we frontendzie
