import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => new Promise(async (resolve) => {
    console.group('🚀 OAuth Initialisierung');
    try {
      const config = { ...environment.authConfig };
      config.redirectUri = window.location.origin;
      config.silentRefreshRedirectUri = window.location.origin + '/assets/silent-check-sso.html';

      oauthService.configure(config);
      oauthService.setStorage(localStorage); 

      console.log('1️⃣ Lade Discovery Document & prüfe URL...');
      // ⚠️ Hier knallt es aktuell, weil die URL einen alten "code" enthält!
      await oauthService.loadDiscoveryDocumentAndTryLogin();

      if (oauthService.hasValidAccessToken()) {
        console.log('✅ 2️⃣ Token ist gültig! Richte Silent Refresh ein...');
        oauthService.setupAutomaticSilentRefresh();
      } else {
        console.warn('⚠️ 2️⃣ Kein Token vorhanden. Warte auf manuellen Login.');
      }
    } catch (error) {
      console.error('❌ OAuth Fehler (vermutlich toter Code in URL):', error);
      
      // 🧹 SELF-HEALING: Storage putzen...
      localStorage.clear();
      sessionStorage.clear();
      
      // 🪄 NEU: Die URL im Browser sofort von toten Parametern (?code=...&state=...) befreien!
      window.history.replaceState({}, document.title, window.location.pathname);
      console.warn('🧹 URL wurde bereinigt. Ein sauberer Neustart ist jetzt möglich.');
      
    } finally {
      console.groupEnd();
      resolve();
    }
  });
}

