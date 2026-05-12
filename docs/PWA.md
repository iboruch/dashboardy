# PWA Guide

Dashboardy includes the foundation for an installable Angular PWA.

## Included

- Web app manifest: `frontend/src/manifest.webmanifest`
- Angular service worker config: `frontend/src/ngsw-config.json`
- Local storage service: `frontend/src/app/services/storage.service.ts`
- UI messaging for demo/offline-oriented behavior

## Local Testing

Build the production frontend and inspect it with browser DevTools:

```bash
cd frontend
npm run build:prod
```

Then review:

- Application -> Manifest
- Application -> Service Workers
- Cache Storage
- Offline simulation

## Limitations

The project caches the app shell and supports local demo behavior. It does not yet implement production-grade offline sync, conflict resolution, background sync queues, or durable provider data caching.
