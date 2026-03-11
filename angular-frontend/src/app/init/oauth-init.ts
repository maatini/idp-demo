import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
    return () => new Promise(async (resolve) => {
        try {
            const config = { ...environment.authConfig };
            // Dynamisch setzen, um SSR oder Build-Probleme zu vermeiden
            config.redirectUri = window.location.origin + '/';
            config.silentRefreshRedirectUri = window.location.origin + '/assets/silent-check-sso.html';
            
            oauthService.configure(config);
            
            await oauthService.loadDiscoveryDocumentAndTryLogin();
            
            if (oauthService.hasValidAccessToken()) {
                oauthService.setupAutomaticSilentRefresh();
            } else {
                // Dies spiegelt das Verhalten von onLoad: 'login-required' wider:
                oauthService.initLoginFlow(); 
            }
        } catch (error) {
            console.error('OAuth initialization failed', error);
        } finally {
            resolve();
        }
    });
}
