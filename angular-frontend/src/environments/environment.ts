import { AuthConfig } from 'angular-oauth2-oidc';

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8091/api',
    authConfig: {
        issuer: 'http://localhost:8080/realms/demo-realm',
        clientId: 'angular-client',
        responseType: 'code',
        scope: 'openid profile email',
        requireHttps: false,
        strictDiscoveryDocumentValidation: false,
        useSilentRefresh: true,

        // === KRITISCHE FLAGS ===
        storage: localStorage,
        saveNoncesInLocalStorage: true,
        clearHashAfterLogin: true,
    } as AuthConfig
};
