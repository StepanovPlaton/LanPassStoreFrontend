import { Component } from '@angular/core';
import { APP_PHONE_DISPLAY, APP_PHONE_RAW } from '@/shared/config/phone.config';

@Component({
	selector: 'app-footer',
	standalone: true,
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	protected readonly phoneDisplay = APP_PHONE_DISPLAY;
	protected readonly phoneRaw = APP_PHONE_RAW;
	protected readonly storeName = 'LanPass';
}

