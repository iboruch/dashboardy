# Quickstart

Use Docker for the fastest local review:

```bash
docker compose up --build
```

Open:

- Frontend: `http://localhost:4200`
- Backend docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

Manual setup:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

In a second terminal:

```bash
cd frontend
nvm use
npm install
npm start
```

The app runs in demo mode without OAuth credentials.
