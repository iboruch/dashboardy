import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Autoryzacja</h2>
        <p *ngIf="loading">{{ message }}</p>
        <div *ngIf="error" class="error">
          {{ error }}
        </div>
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
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      text-align: center;
    }

    .error {
      color: #f44336;
      padding: 10px;
      background-color: #ffebee;
      border-radius: 4px;
    }
  `]
})
export class AuthComponent implements OnInit {
  loading = true;
  error = '';
  message = 'Przetwarzanie autoryzacji...';

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
            this.message = 'Autoryzacja powodzeniu! Przekierowywanie...';
            setTimeout(() => this.router.navigate(['/']), 1500);
          },
          error => {
            this.loading = false;
            this.error = 'Błąd autoryzacji. Spróbuj ponownie.';
            console.error('Auth error:', error);
          }
        );
      } else {
        this.loading = false;
        this.error = 'Brak kodu autoryzacji.';
      }
    });
  }
}
