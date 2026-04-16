import { Component } from '@angular/core';
import { TELEGRAM_URL, WHATSAPP_URL } from '@/shared/config/phone.config';

@Component({
  selector: 'app-messenger-buttons',
  standalone: true,
  templateUrl: './messenger-buttons.component.html',
})
export class MessengerButtonsComponent {
  protected readonly telegramUrl = TELEGRAM_URL;
  protected readonly whatsappUrl = WHATSAPP_URL;
}