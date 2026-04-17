# Setup Guide / Instrukcja uruchomienia

---

## English

### Goal

Use this guide if you cloned or forked the project and want to run it locally.

### Backend

Windows:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python main.py
```

macOS/Linux:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

Expected backend URLs:

- `http://localhost:8000`
- `http://localhost:8000/docs`

Health check:

```bash
curl http://localhost:8000/api/health
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Expected frontend URL:

- `http://localhost:4200`

### Minimal `.env`

Create `backend/.env` from `.env.example`.

Example:

```env
DEBUG=True
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:4200
JWT_SECRET=change-me-for-real-deployments
JWT_ALGORITHM=HS256
JWT_EXPIRY_HOURS=24
DATABASE_URL=sqlite:///./dashboardy.db

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
LINEAR_API_KEY=
```

### No OAuth yet?

That is fine. You can still:

- boot the backend
- boot the frontend
- verify the shell and settings UI
- browse demo dashboard data

### Docker

```bash
docker compose up --build
```

### Troubleshooting

PowerShell blocks `npm` or `ng`:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Port already in use:

```powershell
netstat -ano | Select-String ":4200|:8000"
taskkill /PID <PID> /F
```

Frontend dependencies broken:

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Polski

### Cel

Użyj tego pliku, jeśli sklonowałeś albo sforkowałeś projekt i chcesz uruchomić go lokalnie.

### Backend

Windows:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python main.py
```

macOS/Linux:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

Oczekiwane adresy backendu:

- `http://localhost:8000`
- `http://localhost:8000/docs`

Health check:

```bash
curl http://localhost:8000/api/health
```

### Frontend

Otwórz drugi terminal:

```bash
cd frontend
npm install
npm start
```

Oczekiwany adres frontendu:

- `http://localhost:4200`

### Minimalny `.env`

Utwórz `backend/.env` na bazie `.env.example`.

Przykład:

```env
DEBUG=True
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:4200
JWT_SECRET=change-me-for-real-deployments
JWT_ALGORITHM=HS256
JWT_EXPIRY_HOURS=24
DATABASE_URL=sqlite:///./dashboardy.db

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
LINEAR_API_KEY=
```

### Jeszcze bez OAuth?

To w porządku. Nadal możesz:

- uruchomić backend
- uruchomić frontend
- sprawdzić shell i settings UI
- obejrzeć demo dane na dashboardzie

### Docker

```bash
docker compose up --build
```

### Troubleshooting

PowerShell blokuje `npm` albo `ng`:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Port jest zajęty:

```powershell
netstat -ano | Select-String ":4200|:8000"
taskkill /PID <PID> /F
```

Zepsute zależności frontendu:

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```
