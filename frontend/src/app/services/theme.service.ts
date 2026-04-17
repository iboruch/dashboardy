import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'dashboardy_theme';
  private readonly darkThemeClass = 'dark-theme';

  initTheme(): boolean {
    const isDark = this.getStoredTheme() === 'dark';
    this.applyTheme(isDark);
    return isDark;
  }

  setDarkMode(enabled: boolean): void {
    this.applyTheme(enabled);
    localStorage.setItem(this.storageKey, enabled ? 'dark' : 'light');
  }

  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkThemeClass);
  }

  private getStoredTheme(): 'light' | 'dark' {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(enabled: boolean): void {
    document.body.classList.toggle(this.darkThemeClass, enabled);
  }
}
