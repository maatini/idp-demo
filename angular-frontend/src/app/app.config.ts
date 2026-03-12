import { ApplicationConfig, provideZonelessChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
// 1. OAuthStorage importieren
import { provideOAuthClient, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { initializeOAuth } from './init/oauth-init';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: ['http://localhost:8091/api'],
        sendAccessToken: true
      }
    }),
    // 2. HIER IST DER FIX: LocalStorage als Standard für Token & Nonces definieren
    { provide: OAuthStorage, useFactory: () => localStorage },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      multi: true,
      deps: [OAuthService]
    }
  ]
};
