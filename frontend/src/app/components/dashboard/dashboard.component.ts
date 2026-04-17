import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataService, CalendarEvent, SpotifyTrack, LinearIssue } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <section class="dashboard">
      <div class="dashboard-hero">
        <div>
          <p class="dashboard-kicker">Daily overview</p>
          <h1 class="dashboard-title">Welcome back</h1>
          <p class="dashboard-copy">
            Your calendar, music and Linear work in one cleaner control panel.
          </p>
        </div>

        <div class="dashboard-stats">
          <div class="stat-pill">
            <span class="stat-label">Events</span>
            <strong>{{ calendarEvents.length }}</strong>
          </div>
          <div class="stat-pill">
            <span class="stat-label">Tasks</span>
            <strong>{{ linearIssues.length }}</strong>
          </div>
        </div>
      </div>

      <div class="cards-grid">
        <mat-card class="info-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar calendar-avatar">C</div>
            <mat-card-title>Calendar</mat-card-title>
            <mat-card-subtitle>Upcoming events</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div *ngIf="calendarEvents.length > 0" class="list-block">
              <mat-list>
                <mat-list-item *ngFor="let event of calendarEvents.slice(0, 5)">
                  <mat-icon matListItemIcon>event</mat-icon>
                  <div matListItemTitle>{{ event.title }}</div>
                  <div matListItemLine>{{ event.start | date:'medium' }}</div>
                </mat-list-item>
              </mat-list>
            </div>
            <div *ngIf="calendarEvents.length === 0" class="empty-state">
              <mat-icon>event_busy</mat-icon>
              <p>No events scheduled</p>
              <p class="hint">Connect a calendar account to pull live meetings.</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar spotify-avatar">S</div>
            <mat-card-title>Spotify</mat-card-title>
            <mat-card-subtitle>Now playing</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div *ngIf="currentTrack" class="track-info">
              <div class="track-artwork">
                <mat-icon>album</mat-icon>
              </div>
              <h3>{{ currentTrack.name }}</h3>
              <p class="artist">{{ currentTrack.artist }}</p>
              <p class="album">{{ currentTrack.album }}</p>
              <button mat-flat-button color="primary" class="play-btn">
                <mat-icon>play_circle</mat-icon>
                Open playback
              </button>
            </div>
            <div *ngIf="!currentTrack && isSpotifyAuth" class="empty-state">
              <mat-icon>music_off</mat-icon>
              <p>No track playing</p>
            </div>
            <div *ngIf="!isSpotifyAuth" class="empty-state auth-needed">
              <mat-icon>lock</mat-icon>
              <p>Login to Spotify to show playback here.</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card wide-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar linear-avatar">L</div>
            <mat-card-title>Tasks</mat-card-title>
            <mat-card-subtitle>Your Linear issues</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div *ngIf="linearIssues.length > 0" class="list-block">
              <mat-list>
                <mat-list-item *ngFor="let issue of linearIssues.slice(0, 5)">
                  <mat-icon matListItemIcon>{{ getIssueIcon(issue.status) }}</mat-icon>
                  <div matListItemTitle>{{ issue.title }}</div>
                  <div matListItemLine>{{ issue.assignee }}</div>
                  <mat-chip-set matListItemMeta>
                    <mat-chip [class.priority-chip]="issue.priority > 1">
                      {{ issue.status }}
                    </mat-chip>
                  </mat-chip-set>
                </mat-list-item>
              </mat-list>
            </div>
            <div *ngIf="linearIssues.length === 0" class="empty-state">
              <mat-icon>task_alt</mat-icon>
              <p>All caught up</p>
              <p class="hint">No tasks to show right now.</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .dashboard-hero {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
      padding: 32px;
      border-radius: 28px;
      background:
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.24), transparent 24%),
        linear-gradient(135deg, #4b69f4 0%, #6b5ae6 44%, #12b3a8 100%);
      color: white;
      box-shadow: 0 30px 60px rgba(59, 78, 181, 0.22);
    }

    .dashboard-kicker {
      margin: 0 0 10px;
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.76);
    }

    .dashboard-title {
      margin: 0;
      font-size: clamp(32px, 4vw, 48px);
      line-height: 0.98;
      letter-spacing: -0.04em;
    }

    .dashboard-copy {
      max-width: 560px;
      margin: 14px 0 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.82);
    }

    .dashboard-stats {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .stat-pill {
      min-width: 120px;
      padding: 16px 18px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(12px);
    }

    .stat-label {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: rgba(255, 255, 255, 0.7);
    }

    .stat-pill strong {
      display: block;
      margin-top: 8px;
      font-size: 28px;
      line-height: 1;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 24px;
    }

    .info-card {
      grid-column: span 6;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(96, 118, 163, 0.14);
      box-shadow: 0 20px 45px rgba(25, 47, 89, 0.08);
      background: var(--surface-card);
    }

    .wide-card {
      grid-column: span 12;
    }

    ::ng-deep .info-card .mat-mdc-card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 22px 24px 16px;
      background: linear-gradient(180deg, rgba(79, 109, 245, 0.06), transparent);
    }

    .card-avatar {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
      color: white;
      box-shadow: 0 10px 20px rgba(54, 76, 150, 0.18);
    }

    .calendar-avatar {
      background: linear-gradient(135deg, #3c8df5, #6d5ef7);
    }

    .spotify-avatar {
      background: linear-gradient(135deg, #14b866, #0f8e75);
    }

    .linear-avatar {
      background: linear-gradient(135deg, #ff8a4c, #ff5f6d);
    }

    ::ng-deep .info-card .mat-mdc-card-title {
      color: var(--text-main);
      font-size: 22px;
      font-weight: 700;
    }

    ::ng-deep .info-card .mat-mdc-card-subtitle {
      color: var(--text-soft);
    }

    ::ng-deep .info-card .mat-mdc-card-content {
      padding: 0 16px 16px;
    }

    .list-block {
      border-radius: 18px;
      overflow: hidden;
      background: var(--surface-soft);
      border: 1px solid var(--border-soft);
    }

    ::ng-deep .list-block .mat-mdc-list-item,
    ::ng-deep .list-block .mdc-list-item__primary-text,
    ::ng-deep .list-block .mat-mdc-list-item-title,
    ::ng-deep .list-block .mat-mdc-list-item-line {
      color: var(--text-main) !important;
    }

    ::ng-deep .list-block .mat-icon,
    ::ng-deep .list-block .mat-mdc-list-item-icon {
      color: var(--text-soft) !important;
    }

    ::ng-deep .list-block .mat-mdc-list-item-line {
      color: var(--text-soft) !important;
    }

    .track-info {
      min-height: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 24px;
    }

    .track-artwork {
      width: 88px;
      height: 88px;
      border-radius: 26px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, rgba(20, 184, 102, 0.18), rgba(15, 142, 117, 0.1));
      color: #0f8e75;
    }

    .track-artwork mat-icon {
      width: 42px;
      height: 42px;
      font-size: 42px;
    }

    .track-info h3 {
      margin: 18px 0 8px;
      color: var(--text-main);
      font-size: 24px;
      font-weight: 700;
    }

    .artist {
      margin: 0;
      color: var(--text-main);
      font-weight: 600;
    }

    .album {
      margin: 8px 0 22px;
      color: var(--text-soft);
    }

    .play-btn {
      border-radius: 999px;
      padding-inline: 18px;
    }

    .play-btn mat-icon {
      color: inherit;
    }

    .empty-state {
      min-height: 220px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-align: center;
      padding: 24px;
      color: var(--text-soft);
    }

    .empty-state mat-icon {
      width: 44px;
      height: 44px;
      font-size: 44px;
      color: #b1bed3;
    }

    .empty-state p {
      margin: 0;
      font-size: 16px;
    }

    .empty-state .hint {
      max-width: 260px;
      font-size: 14px;
      color: var(--text-muted);
    }

    .auth-needed {
      border-radius: 18px;
      background: linear-gradient(180deg, var(--surface-soft-top), var(--surface-soft-bottom));
      border: 1px dashed rgba(115, 136, 175, 0.28);
    }

    ::ng-deep .mat-mdc-list-item {
      min-height: 78px;
      border-bottom: 1px solid rgba(102, 126, 173, 0.1);
    }

    ::ng-deep .mat-mdc-list-item:last-child {
      border-bottom: 0;
    }

    ::ng-deep .mat-mdc-standard-chip {
      border-radius: 999px !important;
      background: rgba(79, 109, 245, 0.1) !important;
      color: #3151b4 !important;
    }

    .priority-chip {
      background: rgba(255, 121, 93, 0.14) !important;
      color: #cb5537 !important;
    }

    :host-context(.dark-theme) .info-card {
      border-color: rgba(128, 154, 211, 0.16);
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.24);
    }

    :host-context(.dark-theme) ::ng-deep .info-card .mat-mdc-card-header {
      background: linear-gradient(180deg, rgba(91, 109, 255, 0.1), transparent);
    }

    :host-context(.dark-theme) .track-artwork {
      background: linear-gradient(135deg, rgba(20, 184, 102, 0.24), rgba(15, 142, 117, 0.12));
    }

    :host-context(.dark-theme) .auth-needed {
      border-color: rgba(128, 154, 211, 0.22);
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-list-item {
      border-bottom-color: rgba(128, 154, 211, 0.1);
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-standard-chip {
      background: rgba(91, 109, 255, 0.16) !important;
      color: #c9d6ff !important;
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-chip-action-label,
    :host-context(.dark-theme) ::ng-deep .mdc-evolution-chip__text-label {
      color: #dbe6ff !important;
    }

    :host-context(.dark-theme) .priority-chip,
    :host-context(.dark-theme) .priority-chip ::ng-deep .mat-mdc-chip-action-label,
    :host-context(.dark-theme) .priority-chip ::ng-deep .mdc-evolution-chip__text-label {
      color: #ffd5cb !important;
    }

    :host-context(.dark-theme) ::ng-deep .mat-mdc-unelevated-button:not(:disabled),
    :host-context(.dark-theme) ::ng-deep .mat-mdc-outlined-button:not(:disabled) {
      color: #e6eefc;
    }

    @media (max-width: 960px) {
      .dashboard-hero {
        flex-direction: column;
        align-items: flex-start;
      }

      .dashboard-stats {
        justify-content: flex-start;
      }

      .info-card,
      .wide-card {
        grid-column: span 12;
      }
    }

    @media (max-width: 768px) {
      .dashboard-hero {
        padding: 24px 20px;
        border-radius: 22px;
      }

      .cards-grid {
        gap: 18px;
      }

      .track-info,
      .empty-state {
        min-height: 200px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  calendarEvents: CalendarEvent[] = [];
  currentTrack: SpotifyTrack | null = null;
  linearIssues: LinearIssue[] = [];
  isSpotifyAuth = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.loadDemoData();
  }

  private loadDemoData(): void {
    this.calendarEvents = [
      {
        id: '1',
        title: 'Team Standup',
        description: 'Daily sync',
        start: new Date(),
        end: new Date(Date.now() + 3600000),
        source: 'google'
      },
      {
        id: '2',
        title: 'Project Review',
        description: 'Q1 Planning',
        start: new Date(Date.now() + 86400000),
        end: new Date(Date.now() + 90000000),
        source: 'google'
      }
    ];

    this.isSpotifyAuth = this.authService.isAuthenticated('spotify');
    if (this.isSpotifyAuth) {
      this.currentTrack = {
        id: 'demo-1',
        name: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        image_url: 'https://www.scdn.co/image/ab67616d0000b273...'
      };
    }

    this.linearIssues = [
      {
        id: 'LIN-1',
        title: 'Implement dashboard',
        description: 'Build main dashboard component',
        status: 'In Progress',
        priority: 1,
        assignee: 'You'
      },
      {
        id: 'LIN-2',
        title: 'Add OAuth integration',
        description: 'Setup OAuth for all services',
        status: 'Todo',
        priority: 2,
        assignee: 'You'
      }
    ];
  }

  getIssueIcon(status: string): string {
    const icons: any = {
      'Todo': 'radio_button_unchecked',
      'In Progress': 'schedule',
      'Done': 'check_circle',
      'Cancelled': 'cancel'
    };
    return icons[status] || 'circle';
  }
}
