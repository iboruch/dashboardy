# Backend Guide / Przewodnik po backendzie

## English

### Tech

- FastAPI
- Uvicorn
- Python dotenv
- OAuth provider integrations

### Run locally

```bash
cd backend
python -m venv venv
```

Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

Then:

```bash
pip install -r requirements.txt
cp .env.example .env
python main.py
```

### Important endpoints

- `/api/health`
- `/docs`
- `/api/auth/url/{service}`

### Notes

- the backend can run without OAuth credentials for local boot/testing
- real provider integrations require values in `backend/.env`
- production should move sensitive token handling away from the frontend

## Polski

### Technologia

- FastAPI
- Uvicorn
- Python dotenv
- integracje z providerami OAuth

### Uruchomienie lokalne

```bash
cd backend
python -m venv venv
```

Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

Następnie:

```bash
pip install -r requirements.txt
cp .env.example .env
python main.py
```

### Ważne endpointy

- `/api/health`
- `/docs`
- `/api/auth/url/{service}`

### Uwagi

- backend może działać bez credentials OAuth do lokalnego bootowania/testów
- prawdziwe integracje wymagają wartości w `backend/.env`
- w produkcji wrażliwe tokeny powinny być obsługiwane bardziej po stronie backendu
