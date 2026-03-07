package org.acme;

import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.Map;

@Path("/api/hello")
@Authenticated
public class HelloResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    JsonWebToken accessToken;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Map<String, Object> hello() {
        return Map.of(
            "message", "Hallo " + accessToken.getName() + "!",
            "roles", identity.getRoles(),
            "username", accessToken.getName()
        );
    }
}
