import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import {
  applyThemeClass,
  type Theme,
  writeThemeCookie,
} from '@/shared/theme/theme-cookie';
import { HlmButton } from '@ui/button';
import { HlmIconImports } from '@ui/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [HlmButton, HlmIconImports],
  providers: [provideIcons({ lucideSun, lucideMoon })],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _theme = signal<Theme>(this.readThemeFromDom());
  public readonly isDark = signal(false);

  constructor() {
    effect(() => {
      this.isDark.set(this._theme() === 'dark');
    });

    effect(() => {
      if (this.isBrowser) {
        this.applyTheme(this._theme());
      }
    });
  }

  private readThemeFromDom(): Theme {
    return this.doc.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  }

  private applyTheme(theme: Theme): void {
    applyThemeClass(this.doc, theme);
    writeThemeCookie(this.doc, theme);
  }

  public toggleTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    const newTheme: Theme = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(newTheme);
  }
}
