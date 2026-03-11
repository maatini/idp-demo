import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private oauthService = inject(OAuthService);
  private http = inject(HttpClient);

  isLoggedIn = signal(false);
  username = signal('');
  backendResponse = signal<any>(null);
  loading = signal(false);

  ngOnInit() {
    const authenticated = this.oauthService.hasValidAccessToken();
    this.isLoggedIn.set(authenticated);

    if (authenticated) {
      const claims: any = this.oauthService.getIdentityClaims();
      
      const resolvedName =
        claims?.['preferred_username'] ||
        claims?.['name'] ||
        claims?.['sub'] ||
        'testuser';

      this.username.set(resolvedName);
      console.log('Authenticated as:', resolvedName);
    }
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.postLogoutRedirectUri = window.location.origin;
    this.oauthService.logOut();
  }

  callBackend() {
    this.loading.set(true);
    this.http.get('http://localhost:8091/api/hello').subscribe({
      next: (res) => {
        this.backendResponse.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.backendResponse.set({ error: 'Backend call failed. Is it running?' });
        this.loading.set(false);
      }
    });
  }
}
