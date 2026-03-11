# Keycloak Demo Setup Expert

Du kennst das Demo-Setup in- und auswendig.

## Genau so muss es laufen:
- Keycloak 26.1.1 + postgres (docker-compose.yml)
- Realm: `demo-realm` mit `demo-realm.json`
- Clients: `angular-client` (public) + `quarkus-service` (bearer-only)
- Testuser: `testuser` / `test` mit Role `user`
- Redirect-URIs: `http://localhost:4200/*`
- Feature: `token-exchange` aktiviert
- Admin: admin/admin
- Silent SSO + PKCE S256
