import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  source: 'google' | 'microsoft';
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  image_url?: string;
}

export interface LinearIssue {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: number;
  assignee?: string;
  dueDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCalendarEvents(source: 'google' | 'microsoft'): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.apiUrl}/calendar/${source}/events`);
  }

  createCalendarEvent(source: 'google' | 'microsoft', event: Partial<CalendarEvent>): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.apiUrl}/calendar/${source}/events`, event);
  }

  getCurrentlyPlaying(): Observable<SpotifyTrack> {
    return this.http.get<SpotifyTrack>(`${this.apiUrl}/spotify/currently-playing`);
  }

  getSpotifyPlaylists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/spotify/playlists`);
  }

  getLinearIssues(status?: string): Observable<LinearIssue[]> {
    let url = `${this.apiUrl}/linear/issues`;
    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get<LinearIssue[]>(url);
  }

  updateLinearIssue(issueId: string, updates: Partial<LinearIssue>): Observable<LinearIssue> {
    return this.http.patch<LinearIssue>(`${this.apiUrl}/linear/issues/${issueId}`, updates);
  }
}
