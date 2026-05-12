import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>
        <mat-icon *ngIf="error" class="error-icon">error_outline</mat-icon>
        <h2>OAuth callback</h2>
        <p *ngIf="loading">{{ message }}</p>
        <div *ngIf="error" class="error">
          {{ error }}
        </div>
        <button *ngIf="error" mat-stroked-button type="button" (click)="goHome()">
          Return to dashboard
        </button>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    }

    .auth-card {
      width: min(420px, calc(100% - 32px));
      background: var(--surface-card);
      padding: 36px;
      border-radius: 22px;
      border: 1px solid var(--border-soft);
      box-shadow: 0 24px 52px rgba(25, 47, 89, 0.12);
      text-align: center;
    }

    .auth-card h2 {
      margin: 18px 0 8px;
      color: var(--text-main);
    }

    .auth-card p {
      margin: 0;
      color: var(--text-soft);
    }

    .error {
      margin: 12px 0 20px;
      color: #b42318;
      padding: 12px;
      background-color: rgba(244, 67, 54, 0.08);
      border-radius: 12px;
    }

    .error-icon {
      width: 42px;
      height: 42px;
      font-size: 42px;
      color: #b42318;
    }
  `]
})
export class AuthComponent implements OnInit {
  loading = true;
  error = '';
  message = 'Processing provider callback...';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      const service = params['service'] || 'google';

      if (code) {
        this.authService.handleCallback(service, code, state).subscribe(
          token => {
            this.authService.storeToken(token);
            this.message = 'Authorization complete. Redirecting...';
            setTimeout(() => this.router.navigate(['/']), 1500);
          },
          error => {
            this.loading = false;
            this.error = 'Authorization failed. Check provider credentials and callback configuration.';
            console.error('Auth error:', error);
          }
        );
      } else {
        this.loading = false;
        this.error = 'No authorization code was returned by the provider.';
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
