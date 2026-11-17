import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForward, mailOutline } from 'ionicons/icons';

addIcons({ arrowForward, mailOutline });

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.page.html',
  imports: [IonButton, IonContent, IonIcon, RouterLink],
})
export class CheckEmailPage {
  readonly email: string;
  readonly openMessage = signal('');

  constructor(route: ActivatedRoute) {
    this.email = route.snapshot.queryParamMap.get('email')?.trim() ?? '';
  }

  openEmail(): void {
    const domain = this.email.split('@')[1]?.toLowerCase();
    const inboxes: Record<string, string> = {
      'gmail.com': 'https://mail.google.com/mail/u/0/',
      'googlemail.com': 'https://mail.google.com/mail/u/0/',
      'outlook.com': 'https://outlook.live.com/mail/0/',
      'hotmail.com': 'https://outlook.live.com/mail/0/',
      'live.com': 'https://outlook.live.com/mail/0/',
      'yahoo.com': 'https://mail.yahoo.com/',
      'icloud.com': 'https://www.icloud.com/mail/',
      'me.com': 'https://www.icloud.com/mail/',
      'mac.com': 'https://www.icloud.com/mail/',
    };
    const inbox = domain ? inboxes[domain] : undefined;

    if (!inbox) {
      this.openMessage.set('Abre la aplicación o el sitio donde recibes ese correo para encontrar el mensaje de WayFinder.');
      return;
    }

    window.open(inbox, '_blank', 'noopener,noreferrer');
  }
}
