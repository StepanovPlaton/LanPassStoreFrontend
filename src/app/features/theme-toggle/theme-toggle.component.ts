import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButton } from '@ui/button';
import { HlmIconImports } from '@ui/icon';

type Theme = 'light' | 'dark';

@Component({
    selector: 'app-theme-toggle',
    standalone: true,
    imports: [HlmButton, HlmIconImports],
    providers: [provideIcons({ lucideSun, lucideMoon })],
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    private readonly themeKey = 'theme';
    private readonly defaultTheme: Theme = 'light';

    private readonly _theme = signal<Theme>(this.defaultTheme);
    public readonly isDark = signal(false);

    constructor() {
        if (this.isBrowser) {
            const savedTheme = localStorage.getItem(this.themeKey) as Theme | null;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
            this._theme.set(initialTheme);
            this.applyTheme(initialTheme);
        }

        effect(() => {
            this.isDark.set(this._theme() === 'dark');
        });

        effect(() => {
            if (this.isBrowser) {
                this.applyTheme(this._theme());
            }
        });
    }

    private applyTheme(theme: Theme): void {
        if (!this.isBrowser) {
            return;
        }

        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Сохраняем в localStorage
        localStorage.setItem(this.themeKey, theme);
    }

    public toggleTheme(): void {
        if (!this.isBrowser) {
            return;
        }

        const newTheme: Theme = this._theme() === 'dark' ? 'light' : 'dark';
        this._theme.set(newTheme);
    }
}
