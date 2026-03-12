import { Component, OnInit, signal, inject, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private cdr = inject(ChangeDetectorRef); // 🛠️ Hinzugefügt: Zwingt Angular zum Re-Render
  private destroyRef = inject(DestroyRef);

  isLoggedIn = signal(false);
  username = signal('');
  backendResponse = signal<any>(null);
  loading = signal(false);

  ngOnInit() {
    console.log('🚀 AppComponent init - Prüfe Status...');
    
    // 1. Initiale Prüfung (mit minimalem Delay, um der Library Zeit zu geben)
    setTimeout(() => this.updateAuthState(), 50);

    // 2. Reaktiv auf JEDES Event der Auth-Library reagieren
    this.oauthService.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        console.log('🔄 OAuth Event empfangen:', event.type);
        this.updateAuthState();
      });
  }

  private updateAuthState() {
    const authenticated = this.oauthService.hasValidAccessToken();
    console.log('🔐 Komponente: Ist User authentifiziert?', authenticated);
    
    this.isLoggedIn.set(authenticated);

    if (authenticated) {
      const claims: any = this.oauthService.getIdentityClaims();
      const resolvedName =
        claims?.['preferred_username'] ||
        claims?.['name'] ||
        claims?.['sub'] ||
        'testuser';
      
      this.username.set(resolvedName);
      console.log('👤 Authenticated as:', resolvedName);
    }

    // 🛠️ HIER IST DIE MAGIE FÜR ZONELESS:
    // Sagt Angular explizit: "Hey, der State hat sich geändert, zeichne die UI neu!"
    this.cdr.detectChanges(); 
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
        this.cdr.detectChanges(); // Auch hier das Re-Render absichern
      },
      error: (err) => {
        console.error(err);
        this.backendResponse.set({ error: 'Backend call failed. Is it running?' });
        this.loading.set(false);
        this.cdr.detectChanges();
      }
    });
  }
}
