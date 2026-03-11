import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { KeycloakService } from 'keycloak-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AppComponent', () => {
  let keycloakServiceMock: any;

  beforeEach(async () => {
    keycloakServiceMock = {
      isLoggedIn: vi.fn(),
      getKeycloakInstance: vi.fn(),
      getUsername: vi.fn()
    };
    keycloakServiceMock.isLoggedIn.mockResolvedValue(false);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceMock },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('IDP Demo');
  });
});
