# Frontend Guide / Przewodnik po frontendzie

## English

### Tech

- Angular 17
- standalone components
- Angular Material
- PWA/service worker support

### Run locally

```bash
cd frontend
npm install
npm start
```

### Main areas

- `src/app/components/` UI components
- `src/app/services/` auth/data/storage services
- `src/styles.css` global styles
- `src/ngsw-config.json` service worker cache rules

### Build

```bash
npm run build
```

### Notes

- Angular Material icons need the font links from `src/index.html`
- some dashboard data is still demo content
- component style budgets may warn during build, but the app still compiles

## Polski

### Technologia

- Angular 17
- standalone components
- Angular Material
- wsparcie PWA/service workera

### Uruchomienie lokalne

```bash
cd frontend
npm install
npm start
```

### Główne obszary

- `src/app/components/` komponenty UI
- `src/app/services/` serwisy auth/data/storage
- `src/styles.css` style globalne
- `src/ngsw-config.json` reguły cache service workera

### Build

```bash
npm run build
```

### Uwagi

- ikony Angular Material wymagają fontów podpiętych w `src/index.html`
- część danych na dashboardzie nadal jest demo contentem
- podczas buildu mogą pojawiać się warningi budgetów stylów, ale aplikacja się kompiluje
