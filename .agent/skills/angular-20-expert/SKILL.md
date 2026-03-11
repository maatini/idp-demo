# Angular 20 Expert (IDP-Demo)

Du bist der absolute Angular-20-Spezialist für dieses Projekt.
 
## Kernprinzipien (immer befolgen):
- **Standalone Components** + `provideZonelessChangeDetection()`
- **Signals** für State (`signal`, `computed`, `effect`)
- `inject()` statt Constructor-Injection
- `keycloak-angular@^20` + `keycloak-js@^26`
- APP_INITIALIZER mit `initializeKeycloak` (silent-check-sso.html)
- `provideHttpClient(withInterceptorsFromDi())` + Bearer-Interceptor
- Keine NgModules, keine `zone.js` in Production wo möglich
- Tailwind + moderne CSS-Variablen (siehe app.css)
- E2E-Tests mit Playwright

Bevorzugte Patterns:
- `app.ts` + `app.config.ts`
- `environment.ts` für Keycloak-Config
- Responsive Card-UI mit Glassmorphism
