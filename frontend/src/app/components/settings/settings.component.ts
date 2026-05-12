import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  template: `
    <section class="settings-page">
      <div class="settings-hero">
        <div>
          <p class="settings-kicker">Workspace preferences</p>
          <h1>Settings</h1>
          <p class="settings-copy">
            Tune the app shell, offline behavior and local storage from one place.
          </p>
        </div>
      </div>

      <div class="settings-grid">
        <mat-card class="settings-card">
          <mat-card-content>
            <div class="section-heading">
              <span class="section-icon">A</span>
              <div>
                <h2>Appearance</h2>
                <p>Small visual preferences for daily use.</p>
              </div>
            </div>

            <div class="setting-row">
              <div>
                <h3>Dark mode</h3>
                <p>Enable an alternate visual theme for low-light work.</p>
              </div>
              <mat-slide-toggle [(ngModel)]="darkMode" (ngModelChange)="onDarkModeChange($event)"></mat-slide-toggle>
            </div>

            <div class="setting-row">
              <div>
                <h3>Notifications</h3>
                <p>Planned integration reminders. Not enabled in the demo build.</p>
              </div>
              <span class="coming-soon">Coming soon</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-content>
            <div class="section-heading">
              <span class="section-icon sync-icon">S</span>
              <div>
                <h2>Sync & Offline</h2>
                <p>How Dashboardy should behave between online and offline states.</p>
              </div>
            </div>

            <div class="setting-row">
              <div>
                <h3>Auto sync</h3>
                <p>Manual demo data is shown today. Background provider refresh is planned.</p>
              </div>
              <span class="coming-soon">Coming soon</span>
            </div>

            <div class="status-tile">
              <div>
                <span class="status-label">Offline package</span>
                <strong>Ready</strong>
                <p>Cached app shell and demo data are available locally.</p>
              </div>
              <span class="status-badge">Healthy</span>
            </div>

            <div class="button-group">
              <button mat-flat-button color="primary" disabled>
                <mat-icon>refresh</mat-icon>
                Sync coming soon
              </button>
              <button mat-stroked-button disabled>
                <mat-icon>download</mat-icon>
                Offline bundle managed by PWA
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-content>
            <div class="section-heading">
              <span class="section-icon storage-icon">D</span>
              <div>
                <h2>Storage & Data</h2>
                <p>Inspect local usage and maintenance actions.</p>
              </div>
            </div>

            <div class="metric-grid">
              <div class="metric-card">
                <span>Cache size</span>
                <strong>2.3 MB</strong>
                <p>Current offline assets and cached payloads.</p>
              </div>
              <div class="metric-card">
                <span>Sync queue</span>
                <strong>0 items</strong>
                <p>No pending actions waiting for reconnection.</p>
              </div>
            </div>

            <div class="button-group">
              <button mat-stroked-button disabled>
                <mat-icon>ios_share</mat-icon>
                Export coming soon
              </button>
              <button mat-stroked-button color="warn" (click)="clearCache()">
                <mat-icon>delete</mat-icon>
                Clear cache
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-card about-card">
          <mat-card-content>
            <div class="section-heading">
              <span class="section-icon about-icon">I</span>
              <div>
                <h2>About</h2>
                <p>Build and release information.</p>
              </div>
            </div>

            <div class="about-copy">
              <p><strong>Dashboardy</strong> v1.0.0</p>
              <p>A compact PWA dashboard for calendar, music and task workflows.</p>
              <p class="muted">© 2026 Igor Boruch</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    .settings-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .settings-hero {
      padding: 30px 32px;
      border-radius: 28px;
      color: white;
      background:
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 28%),
        linear-gradient(135deg, #3f67f2 0%, #635be7 48%, #1bb5aa 100%);
      box-shadow: 0 30px 60px rgba(59, 78, 181, 0.2);
    }

    .settings-kicker {
      margin: 0 0 10px;
      font-size: 12px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.76);
    }

    .settings-hero h1 {
      margin: 0;
      font-size: clamp(32px, 4vw, 46px);
      line-height: 0.98;
      letter-spacing: -0.04em;
    }

    .settings-copy {
      max-width: 620px;
      margin: 14px 0 0;
      color: rgba(255, 255, 255, 0.84);
      font-size: 16px;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 24px;
    }

    .settings-card {
      grid-column: span 6;
      border-radius: 24px;
      border: 1px solid rgba(96, 118, 163, 0.14);
      box-shadow: 0 18px 40px rgba(25, 47, 89, 0.08);
      background: rgba(255, 255, 255, 0.94);
    }

    .about-card {
      grid-column: span 12;
    }

    ::ng-deep .settings-card .mat-mdc-card-content {
      padding: 24px;
    }

    .section-heading {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 22px;
    }

    .section-heading h2 {
      margin: 0;
      color: var(--text-main);
      font-size: 24px;
      font-weight: 700;
    }

    .section-heading p {
      margin: 6px 0 0;
      color: var(--text-soft);
    }

    .section-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
      color: white;
      background: linear-gradient(135deg, #4f6df5, #7d5cff);
      box-shadow: 0 12px 24px rgba(79, 109, 245, 0.24);
    }

    .sync-icon {
      background: linear-gradient(135deg, #18b576, #0f8e75);
    }

    .storage-icon {
      background: linear-gradient(135deg, #ff9651, #ff6c67);
    }

    .about-icon {
      background: linear-gradient(135deg, #67758f, #31425c);
    }

    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 18px 0;
      border-top: 1px solid rgba(102, 126, 173, 0.12);
    }

    .setting-row:first-of-type {
      border-top: 0;
      padding-top: 0;
    }

    .setting-row:last-of-type {
      padding-bottom: 0;
    }

    .setting-row h3 {
      margin: 0;
      color: var(--text-main);
      font-size: 17px;
      font-weight: 700;
    }

    .setting-row p {
      margin: 6px 0 0;
      color: var(--text-soft);
      max-width: 420px;
      font-size: 14px;
    }

    .status-tile {
      margin-top: 24px;
      padding: 18px 20px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      border-radius: 18px;
      background: linear-gradient(180deg, var(--surface-soft-top), var(--surface-soft-bottom));
      border: 1px solid var(--border-soft);
    }

    .status-label {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--text-soft);
    }

    .status-tile strong {
      display: block;
      margin-top: 6px;
      color: var(--text-main);
      font-size: 24px;
    }

    .status-tile p {
      margin: 8px 0 0;
      color: var(--text-soft);
      font-size: 14px;
    }

    .status-badge {
      white-space: nowrap;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(21, 143, 104, 0.12);
      color: #158f68;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .coming-soon {
      white-space: nowrap;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(123, 106, 23, 0.1);
      color: #7b6a17;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .metric-card {
      padding: 18px;
      border-radius: 18px;
      background: var(--surface-soft);
      border: 1px solid var(--border-soft);
    }

    .metric-card span {
      display: block;
      color: var(--text-soft);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    .metric-card strong {
      display: block;
      margin: 8px 0 10px;
      color: var(--text-main);
      font-size: 26px;
      line-height: 1;
    }

    .metric-card p,
    .about-copy p {
      margin: 0;
      color: var(--text-soft);
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 20px;
    }

    .button-group button {
      border-radius: 999px;
      color: var(--text-main);
      border-color: var(--border-soft);
    }

    .button-group button:disabled {
      opacity: 0.62;
    }

    .button-group button mat-icon {
      color: inherit;
    }

    .about-copy {
      padding: 2px 0 0 58px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .about-copy .muted {
      color: var(--text-muted);
    }

    :host-context(.dark-theme) .settings-card {
      background: rgba(17, 27, 47, 0.88);
      border-color: rgba(128, 154, 211, 0.16);
      box-shadow: 0 22px 46px rgba(0, 0, 0, 0.26);
    }

    :host-context(.dark-theme) .setting-row {
      border-top-color: rgba(128, 154, 211, 0.12);
    }

    :host-context(.dark-theme) .status-badge {
      background: rgba(42, 191, 130, 0.16);
      color: #67e0ac;
    }

    :host-context(.dark-theme) .coming-soon {
      background: rgba(255, 217, 102, 0.12);
      color: #ffe082;
    }

    :host-context(.dark-theme) .section-icon {
      box-shadow: 0 12px 24px rgba(46, 67, 130, 0.32);
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-unelevated-button:not(:disabled),
    :host-context(.dark-theme) ::ng-deep .mat-mdc-outlined-button:not(:disabled) {
      color: #e6eefc;
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-outlined-button:not(:disabled) {
      border-color: rgba(128, 154, 211, 0.18);
    }

    :host-context(.dark-theme) ::ng-deep .mat-icon {
      color: inherit;
    }

    @media (max-width: 960px) {
      .settings-card,
      .about-card {
        grid-column: span 12;
      }
    }

    @media (max-width: 768px) {
      .settings-hero {
        padding: 24px 20px;
        border-radius: 22px;
      }

      .metric-grid {
        grid-template-columns: 1fr;
      }

      .setting-row,
      .status-tile {
        flex-direction: column;
        align-items: flex-start;
      }

      .about-copy {
        padding-left: 0;
      }
    }
  `]
})
export class SettingsComponent implements OnInit {
  darkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.isDarkMode();
  }

  onDarkModeChange(enabled: boolean): void {
    this.themeService.setDarkMode(enabled);
  }

  clearCache(): void {
    if (confirm('Are you sure? This will clear all cached data.')) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => caches.delete(cacheName));
      });
      console.log('Cache cleared');
    }
  }
}
