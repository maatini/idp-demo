# quarkus-backend

This project uses Quarkus, the Supersonic Subatomic Java Framework (Version 3.15.1).

If you want to learn more about Quarkus, please visit its website: <https://quarkus.io/>.

## OIDC & Security Architecture

This backend serves as a secured resource server via the `quarkus-oidc` extension. It validates JWT tokens coming from identity providers like Keycloak.
- **Port**: Runs on `8091` (`quarkus.http.port=8091`).
- **Authorization**: Endpoints are secured ensuring only authenticated contexts succeed (`@Authenticated`) and asserting proper roles (`@RolesAllowed("user")`).
- **Identity Information**: The backend constructs a structured JSON response identifying the injected `username` and specific `roles`.

## Running the application in dev mode

We recommend using the Devbox scripts to boot the backend environment efficiently:

```shell script
devbox run backend
```
Or use the maven wrapper directly:
```shell script
./mvnw compile quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at <http://localhost:8091/q/dev/>.

## Packaging and running the application

The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

## Related Guides
- OpenID Connect ([guide](https://quarkus.io/guides/security-openid-connect)): Verify Bearer access tokens and authenticate users with Authorization Code Flow
