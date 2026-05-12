# Setup Guide

Dashboardy can run with Docker Compose or with separate backend/frontend processes.

## Docker

```bash
docker compose up --build
```

Docker starts:

- Angular dev server on `http://localhost:4200`
- FastAPI on `http://localhost:8000`

Create `backend/.env` from `backend/.env.example` only when configuring real OAuth provider credentials.

## Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

Windows PowerShell activation:

```powershell
.\venv\Scripts\Activate.ps1
```

Health check:

```bash
curl http://localhost:8000/api/health
```

## Frontend

Use Node 20 for local frontend work:

```bash
cd frontend
nvm use
```

```bash
npm install
npm start
```

Use `npm run start:local` if you want Angular CLI to open the browser automatically.

## Environment

`backend/.env.example` contains safe local defaults. Leave OAuth values blank to use demo mode. Add real provider credentials only in `backend/.env`, which is ignored by Git.

## Troubleshooting

Port already in use:

```bash
lsof -i :4200
lsof -i :8000
```

Frontend dependencies stale:

```bash
cd frontend
rm -rf node_modules
npm ci
```

Backend virtualenv stale:

```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
