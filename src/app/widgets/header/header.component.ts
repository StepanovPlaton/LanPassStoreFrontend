import { Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMenu, lucidePhone } from '@ng-icons/lucide';
import { HlmButton } from '@ui/button';
import { HlmIconImports } from '@ui/icon';
import { HlmNavigationMenuImports } from '@ui/navigation-menu';
import { HlmSheetImports } from '@ui/sheet';
import { CartComponent } from '@/features/cart/cart.component';
import { ThemeToggleComponent } from '@/features/theme-toggle/theme-toggle.component';
import { APP_PHONE_DISPLAY, APP_PHONE_RAW } from '@/shared/config/phone.config';
import type { Category } from '@/entities/category';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [HlmButton, HlmIconImports, HlmNavigationMenuImports, HlmSheetImports, CartComponent, ThemeToggleComponent],
	providers: [provideIcons({ lucideMenu, lucidePhone })],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	protected readonly phoneDisplay = APP_PHONE_DISPLAY;
	protected readonly phoneRaw = APP_PHONE_RAW;

	/** Категории с бэкенда (например, /api/categories) */
	categories = input<Category[]>([]);
}
