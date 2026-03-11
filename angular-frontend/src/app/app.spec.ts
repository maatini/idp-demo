import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { OAuthService } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AppComponent', () => {
  let oauthServiceMock: any;

  beforeEach(async () => {
    oauthServiceMock = {
      hasValidAccessToken: vi.fn(),
      getIdentityClaims: vi.fn(),
      initLoginFlow: vi.fn(),
      logOut: vi.fn()
    };
    oauthServiceMock.hasValidAccessToken.mockReturnValue(false);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: OAuthService, useValue: oauthServiceMock },
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
