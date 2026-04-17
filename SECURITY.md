# Security / Bezpieczeństwo

## English

Do not commit real API keys, OAuth secrets, or production database credentials.

If you find a security issue, do not open a public issue with the secret or exploit details.
Instead, report it privately to the project maintainer.

Recommended basics:

- keep `backend/.env` local only
- rotate leaked credentials immediately
- use HTTPS in production
- do not store long-lived secrets in frontend code

## Polski

Nie commituj prawdziwych kluczy API, sekretów OAuth ani produkcyjnych danych dostępowych do bazy.

Jeśli znajdziesz problem bezpieczeństwa, nie wrzucaj publicznego issue z sekretami albo szczegółami exploita.
Zgłoś to prywatnie do maintainerów projektu.

Podstawowe zasady:

- trzymaj `backend/.env` tylko lokalnie
- od razu rotuj ujawnione credentials
- używaj HTTPS w produkcji
- nie przechowuj długowiecznych sekretów we frontendzie
