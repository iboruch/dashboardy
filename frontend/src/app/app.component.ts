import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <div class="app-shell">
      <app-navbar></app-navbar>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(98, 108, 255, 0.18), transparent 28%),
        radial-gradient(circle at top right, rgba(0, 181, 173, 0.14), transparent 24%),
        linear-gradient(180deg, var(--surface-page-top) 0%, var(--surface-page-bottom) 100%);
    }

    .app-main {
      width: min(1240px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 48px;
    }

    @media (max-width: 768px) {
      .app-main {
        width: min(100% - 20px, 1240px);
        padding: 20px 0 28px;
      }
    }

    :host-context(.dark-theme) .app-shell {
      background:
        radial-gradient(circle at top left, rgba(91, 109, 255, 0.18), transparent 26%),
        radial-gradient(circle at top right, rgba(35, 199, 184, 0.12), transparent 24%),
        linear-gradient(180deg, #0d1524 0%, #111b2f 100%);
    }
  `]
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.initTheme();
  }
}
