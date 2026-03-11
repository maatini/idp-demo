import { ApplicationConfig, provideZonelessChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideOAuthClient, OAuthService } from 'angular-oauth2-oidc';
import { initializeOAuth } from './init/oauth-init';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideOAuthClient({
      config: {
        sendAccessToken: true,
        allowedUrls: ['http://localhost:8091/api']
      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      multi: true,
      deps: [OAuthService]
    }
  ]
};
