import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  service: 'google' | 'spotify' | 'microsoft' | 'linear';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  service: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokens$ = new BehaviorSubject<Map<string, AuthToken>>(this.loadTokens());
  readonly tokensChanged$ = this.tokens$.asObservable();
  private demoMode = environment.demoMode;

  constructor(private http: HttpClient) {
    this.loadTokens();
  }

  private loadTokens(): Map<string, AuthToken> {
    const stored = localStorage.getItem('dashboardy_tokens');
    return stored ? new Map(Object.entries(JSON.parse(stored))) : new Map();
  }

  private saveTokens(): void {
    const tokens = Object.fromEntries(this.tokens$.value);
    localStorage.setItem('dashboardy_tokens', JSON.stringify(tokens));
  }

  getAuthUrl(service: 'google' | 'spotify' | 'microsoft' | 'linear'): Observable<{ auth_url: string }> {
    if (this.demoMode) {
      const demoToken: AuthToken = {
        access_token: `demo-${service}-token-${Date.now()}`,
        service: service,
        expires_at: Date.now() + 24 * 60 * 60 * 1000
      };
      this.storeToken(demoToken);
      return of({ auth_url: 'demo-mode' });
    }
    return this.http.get<{ auth_url: string }>(`${this.apiUrl}/auth/url/${service}`);
  }

  isDemoMode(): boolean {
    return this.demoMode;
  }

  handleCallback(service: string, code: string, state?: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.apiUrl}/auth/callback`, {
      service,
      code,
      state
    });
  }

  storeToken(token: AuthToken): void {
    const tokens = this.tokens$.value;
    tokens.set(token.service, token);
    this.tokens$.next(tokens);
    this.saveTokens();
  }

  getToken(service: 'google' | 'spotify' | 'microsoft' | 'linear'): AuthToken | undefined {
    return this.tokens$.value.get(service);
  }

  isAuthenticated(service: 'google' | 'spotify' | 'microsoft' | 'linear'): boolean {
    const token = this.getToken(service);
    if (!token) return false;
    if (token.expires_at) {
      return token.expires_at > Date.now();
    }
    return true;
  }

  logout(service: string): void {
    const tokens = this.tokens$.value;
    tokens.delete(service);
    this.tokens$.next(tokens);
    this.saveTokens();
  }

  logoutAll(): void {
    this.tokens$.next(new Map());
    localStorage.removeItem('dashboardy_tokens');
  }
}
