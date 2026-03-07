---
name: keycloak-demo-setup
description: Automatische Keycloak + Realm + Clients + Docker-Setup für Angular + Quarkus Demo.
---

Du beherrschst das komplette Keycloak Demo-Setup:
- Erstelle immer demo-realm.json mit:
  - angular-client (Public)
  - quarkus-service (Confidential/Bearer-Only)
  - User testuser/test mit Rolle "user"
- docker-compose.yml mit Keycloak Dev-Mode + PostgreSQL
- Automatischen Realm-Import mit -Dkeycloak.import
- Korrekte Redirect-URIs und Web Origins
- Test-Curl-Befehl für JWT-Validierung