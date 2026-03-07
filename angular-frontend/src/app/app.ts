import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private keycloak = inject(KeycloakService);
  private http = inject(HttpClient);

  isLoggedIn = signal(false);
  username = signal('');
  backendResponse = signal<any>(null);
  loading = signal(false);

  async ngOnInit() {
    this.isLoggedIn.set(await this.keycloak.isLoggedIn());
    if (this.isLoggedIn()) {
      const profile = await this.keycloak.loadUserProfile();
      this.username.set(profile.username || 'User');
    }
  }

  async login() {
    await this.keycloak.login();
  }

  async logout() {
    await this.keycloak.logout(window.location.origin);
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
