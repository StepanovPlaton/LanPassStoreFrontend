import { Component } from '@angular/core';

@Component({
  selector: 'app-messenger-buttons',
  standalone: true,
  templateUrl: './messenger-buttons.component.html',
})
export class MessengerButtonsComponent {
  protected readonly telegramUrl = import.meta.env['VITE_TELEGRAM_URL'] ?? '';
  protected readonly whatsappUrl = import.meta.env['VITE_WHATSAPP_URL'] ?? '';
}
