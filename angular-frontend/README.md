# AngularFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.17.

## Development server

To start a local development server via Devbox, run:

```bash
devbox run frontend
```

Or classically with `ng serve`. Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Authentication (angular-oauth2-oidc)

Authentication is handled via the modern `angular-oauth2-oidc` library. The logic is configured in `src/app/init/oauth-init.ts` ensuring Discovery, automatic Login redirects for unauthenticated users, and silent refresh logic using `silent-check-sso.html`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing using **Playwright**, run:

```bash
devbox run test:e2e
```

Playwright is configured to run complete user-interaction scenarios in the Chromium browser, effectively interacting with Keycloak securely. All tests reside in the `e2e-tests` directory.
