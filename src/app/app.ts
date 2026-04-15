import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessengerButtonsComponent } from '@/widgets/messenger-buttons/messenger-buttons.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessengerButtonsComponent],
  template: `
    <router-outlet />
    <app-messenger-buttons />
  `,
  styles: ``,
})
export class App {}
