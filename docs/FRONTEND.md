# Frontend Guide

The frontend is an Angular 17 application built with standalone components and Angular Material.

## Run

```bash
cd frontend
npm install
npm start
```

## Build

```bash
npm run build
```

## Main Areas

- `src/app/components/dashboard/` - dashboard cards, demo messaging, empty states
- `src/app/components/settings/` - theme, offline, and data maintenance controls
- `src/app/components/navbar/` - app shell navigation and provider menu
- `src/app/services/` - auth, data, storage, and theme services
- `src/styles.css` - global theme tokens
- `src/ngsw-config.json` - Angular service worker cache rules

## Demo Behavior

The frontend defaults to demo mode in `AuthService`. Provider actions create local demo tokens so the UI can show connected states without real OAuth credentials.

Actions that are not wired yet should be disabled or labeled as coming soon. Avoid adding buttons that only log to the console.

## Build Budgets

The production build uses Angular budgets in `angular.json`. The warning thresholds are calibrated against the current Angular Material demo build while keeping error limits close enough to catch accidental bundle growth.

Font inlining is disabled for production optimization so CI and local builds do not depend on fetching Google Fonts during `ng build`.
