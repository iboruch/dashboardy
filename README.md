# Dashboardy

Offline-capable productivity dashboard with Angular, FastAPI and OAuth integrations.

Dashboardy is designed to be:

- easy to run locally
- easy to fork on GitHub
- easy to extend with your own integrations

---

## English

### Stack

- Angular 17 frontend
- FastAPI backend
- OAuth integrations for Google, Spotify, Microsoft and Linear
- PWA/offline support

### Repository layout

```text
Dashboardy/
|-- frontend/        Angular app
|-- backend/         FastAPI app
|-- docs/            Extended documentation
|-- docker-compose.yml
|-- README.md
`-- SETUP.md
```

### Quick start

1. Clone the repository:

```bash
git clone https://github.com/<your-name>/dashboardy.git
cd dashboardy
```

2. Start the backend:

Windows PowerShell:

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

3. Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm start
```

### Local URLs

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

### Demo mode

You can run the project without real OAuth credentials.

Without provider keys:

- the UI loads
- demo dashboard data is visible
- settings and shell can be tested
- OAuth buttons will not connect to real services

### OAuth callbacks for local development

- Google: `http://localhost:4200/auth/google/callback`
- Spotify: `http://localhost:4200/auth/spotify/callback`
- Microsoft: `http://localhost:4200/auth/microsoft/callback`
- Linear: `http://localhost:4200/auth/linear/callback`

### Docker

```bash
docker compose up --build
```

### Publishing notes

Before publishing publicly:

- keep `backend/.env` out of Git
- make sure no real secrets are committed
- add screenshots to the repository
- document what is demo data vs live integration

### Current status

- the project runs locally as a frontend + backend app
- the shell, settings screen and theme switching are implemented
- OAuth structure is present, but using real providers still requires your own credentials
- some dashboard widgets still use demo/mock data instead of fully wired backend responses
- some settings actions are currently placeholders or partial implementations

### Known limitations

- not every dashboard card is fully connected to live provider data yet
- build passes, but Angular still reports bundle/style budget warnings
- this repository is GitHub-ready as open source, but not yet production-ready as a polished hosted product

### Extra docs

- [SETUP.md](./SETUP.md)
- [docs/FRONTEND.md](./docs/FRONTEND.md)
- [docs/BACKEND.md](./docs/BACKEND.md)
- [docs/OAUTH.md](./docs/OAUTH.md)
- [docs/PWA.md](./docs/PWA.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)

---

## Polski

### Stack

- frontend w Angular 17
- backend w FastAPI
- integracje OAuth dla Google, Spotify, Microsoft i Linear
- wsparcie PWA/offline

### Struktura repozytorium

```text
Dashboardy/
|-- frontend/        Aplikacja Angular
|-- backend/         Aplikacja FastAPI
|-- docs/            Rozszerzona dokumentacja
|-- docker-compose.yml
|-- README.md
`-- SETUP.md
```

### Szybki start

1. Sklonuj repozytorium:

```bash
git clone https://github.com/<twoj-login>/dashboardy.git
cd dashboardy
```

2. Uruchom backend:

Windows PowerShell:

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

3. Uruchom frontend w drugim terminalu:

```bash
cd frontend
npm install
npm start
```

### Lokalne adresy

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

### Tryb demo

Projekt można uruchomić bez prawdziwych credentials OAuth.

Bez kluczy dostawców:

- UI ładuje się normalnie
- dashboard pokazuje demo dane
- settings i shell można testować lokalnie
- przyciski OAuth nie połączą się z prawdziwymi usługami

### Callbacki OAuth dla developmentu lokalnego

- Google: `http://localhost:4200/auth/google/callback`
- Spotify: `http://localhost:4200/auth/spotify/callback`
- Microsoft: `http://localhost:4200/auth/microsoft/callback`
- Linear: `http://localhost:4200/auth/linear/callback`

### Docker

```bash
docker compose up --build
```

### Uwagi przed publikacją

Przed wrzuceniem repo publicznie:

- nie commituj `backend/.env`
- sprawdź, czy w repo nie ma prawdziwych sekretów
- dodaj screenshoty do repo
- opisz jasno, co jest demo danymi, a co live integracją

### Aktualny stan projektu

- projekt uruchamia się lokalnie jako frontend + backend
- shell aplikacji, ekran settings i przełączanie motywu są zaimplementowane
- struktura OAuth jest gotowa, ale do prawdziwych integracji potrzebne są własne credentials
- część widgetów dashboardu nadal używa demo/mock danych zamiast pełnych odpowiedzi z backendu
- część akcji w settings to nadal placeholdery albo częściowe implementacje

### Znane ograniczenia

- nie każda karta dashboardu jest jeszcze w pełni podpięta do live danych z providerów
- build przechodzi, ale Angular nadal pokazuje warningi dotyczące rozmiaru bundla i stylów
- repo jest gotowe do publikacji na GitHubie jako open source, ale nie jest jeszcze produkcyjnie dopracowanym hostowanym produktem

### Dalsza dokumentacja

- [SETUP.md](./SETUP.md)
- [docs/FRONTEND.md](./docs/FRONTEND.md)
- [docs/BACKEND.md](./docs/BACKEND.md)
- [docs/OAUTH.md](./docs/OAUTH.md)
- [docs/PWA.md](./docs/PWA.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)
