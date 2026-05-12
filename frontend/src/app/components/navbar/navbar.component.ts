import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule
  ],
  template: `
    <mat-toolbar class="navbar">
      <div class="navbar__inner">
        <button class="brand" type="button" (click)="goHome()">
          <span class="brand__mark">D</span>
          <span class="brand__text">
            <span class="brand__eyebrow">Personal cockpit</span>
            <span class="brand__title">Dashboardy</span>
          </span>
        </button>

        <div class="toolbar-actions">
          <button mat-stroked-button class="settings-button" (click)="toggleSettings()">
            <mat-icon>tune</mat-icon>
            <span>Settings</span>
          </button>

          <button mat-icon-button [matMenuTriggerFor]="authMenu" matTooltip="OAuth services" class="account-button">
            <mat-icon [matBadge]="getAuthCount()" matBadgeColor="accent" matBadgeSize="small">
              account_circle
            </mat-icon>
          </button>
        </div>
      </div>

      <mat-menu #authMenu="matMenu" class="auth-menu">
        <button mat-menu-item disabled>
          <strong>{{ isDemoMode() ? 'Demo integrations' : 'OAuth integrations' }}</strong>
        </button>
        <mat-divider></mat-divider>

        <div *ngFor="let service of services" class="service-item">
          <button mat-menu-item (click)="toggleProvider(service)" class="service-login">
            <span class="service-badge" [ngClass]="'service-badge--' + service">
              {{ getServiceBadge(service) }}
            </span>
            <span class="service-name">{{ service | titlecase }}</span>
            <span class="status" *ngIf="isAuthenticated(service)">Disconnect</span>
            <span class="status pending" *ngIf="!isAuthenticated(service)">
              {{ isDemoMode() ? 'Use demo' : 'Connect' }}
            </span>
          </button>
        </div>
        <mat-divider></mat-divider>
        <button *ngIf="menuFeedback" mat-menu-item disabled class="menu-feedback">
          {{ menuFeedback }}
        </button>
        <button mat-menu-item disabled class="menu-note">
          Demo mode stores local sample sessions. Real OAuth requires backend credentials and demo mode disabled.
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 20;
      height: 84px;
      padding: 0;
      background: rgba(250, 252, 255, 0.88);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(79, 98, 148, 0.12);
      box-shadow: 0 18px 40px rgba(25, 47, 89, 0.06);
    }

    .navbar__inner {
      width: min(1240px, calc(100% - 32px));
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      background: transparent;
      border: 0;
      cursor: pointer;
      color: var(--text-main);
    }

    .brand__mark {
      width: 42px;
      height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      font-size: 20px;
      font-weight: 800;
      color: white;
      background: linear-gradient(135deg, #4f6df5, #7d5cff);
      box-shadow: 0 12px 24px rgba(79, 109, 245, 0.28);
    }

    .brand__text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.05;
    }

    .brand__eyebrow {
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-soft);
    }

    .brand__title {
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .settings-button,
    .account-button {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.72);
      border-color: rgba(79, 98, 148, 0.16);
    }

    .settings-button mat-icon {
      margin-right: 6px;
    }

    .service-item {
      padding: 4px 0;
    }

    .service-login {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--text-main) !important;
    }

    .service-badge {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 24px;
      font-size: 12px;
      font-weight: 800;
      color: white;
    }

    .service-badge--google {
      background: linear-gradient(135deg, #4285f4, #34a853);
    }

    .service-badge--spotify {
      background: linear-gradient(135deg, #1db954, #149c64);
    }

    .service-badge--microsoft {
      background: linear-gradient(135deg, #0078d4, #5b5fc7);
    }

    .service-badge--linear {
      background: linear-gradient(135deg, #ff5e7a, #a855f7);
    }

    .service-name {
      color: inherit !important;
      opacity: 1 !important;
    }

    .status {
      margin-left: auto;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #158f68;
    }

    .pending {
      color: #7b6a17;
    }

    .menu-note {
      font-size: 12px;
      white-space: normal;
    }

    .menu-feedback {
      font-size: 12px;
      color: #3151b4 !important;
      white-space: normal;
    }

    ::ng-deep .mat-mdc-menu-panel {
      border-radius: 16px;
      box-shadow: 0 28px 60px rgba(20, 44, 86, 0.16);
    }

    :host-context(.dark-theme) .navbar {
      background: rgba(10, 17, 30, 0.82);
      border-bottom-color: rgba(128, 154, 211, 0.16);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
    }

    :host-context(.dark-theme) .settings-button,
    :host-context(.dark-theme) .account-button {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(128, 154, 211, 0.18);
      color: #e6eefc;
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-menu-panel {
      background: #13203a;
      color: #e6eefc;
    }

    :host-context(.dark-theme) .service-name {
      color: inherit !important;
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-menu-item[disabled] {
      color: #b4c3de;
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-menu-content,
    :host-context(.dark-theme) ::ng-deep .mat-mdc-menu-item-text {
      color: #e6eefc;
    }

    :host-context(.dark-theme) .service-login {
      color: #e6eefc !important;
    }

    @media (max-width: 768px) {
      .navbar {
        height: auto;
        padding: 12px 0;
      }

      .navbar__inner {
        width: min(100% - 20px, 1240px);
      }

      .brand__title {
        font-size: 24px;
      }

      .brand__eyebrow {
        display: none;
      }

      .settings-button span {
        display: none;
      }

      .settings-button mat-icon {
        margin-right: 0;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  services = ['google', 'spotify', 'microsoft', 'linear'];
  isOffline = false;
  menuFeedback = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener('online', () => this.isOffline = false);
    window.addEventListener('offline', () => this.isOffline = true);
    this.isOffline = !navigator.onLine;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  toggleSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  getAuthCount(): number {
    return this.services.filter(s => this.isAuthenticated(s as any)).length;
  }

  isAuthenticated(service: string): boolean {
    return this.authService.isAuthenticated(service as any);
  }

  isDemoMode(): boolean {
    return this.authService.isDemoMode();
  }

  toggleProvider(service: string): void {
    if (this.isAuthenticated(service)) {
      this.authService.logout(service);
      this.menuFeedback = `${this.toTitle(service)} demo session removed.`;
      return;
    }

    this.authService.getAuthUrl(service as any).subscribe(
      () => {
        this.menuFeedback = this.isDemoMode()
          ? `${this.toTitle(service)} demo session enabled.`
          : `Opening ${this.toTitle(service)} authorization.`;
      },
      () => {
        this.menuFeedback = `${this.toTitle(service)} could not be connected. Check backend credentials.`;
      }
    );
  }

  getServiceBadge(service: string): string {
    const badges: any = {
      'google': 'G',
      'spotify': 'S',
      'microsoft': 'M',
      'linear': 'L'
    };
    return badges[service] || '?';
  }

  getServiceColor(service: string): string {
    if (this.isAuthenticated(service)) return 'accent';
    return '';
  }

  private toTitle(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
