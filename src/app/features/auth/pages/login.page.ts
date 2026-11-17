import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowForward, eyeOffOutline, eyeOutline, location, lockClosedOutline, mailOutline } from 'ionicons/icons';

import { isValidEmail } from '../utils/auth-validation';

addIcons({ arrowForward, eyeOffOutline, eyeOutline, location, lockClosedOutline, mailOutline });

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [FormsModule, IonButton, IonContent, IonIcon, IonInput, RouterLink],
})
export class LoginPage {
  email = '';
  password = '';
  showPassword = false;
  submitted = false;
  readonly notice = signal('');
  readonly error = signal('');

  get isEmailValid(): boolean {
    return isValidEmail(this.email);
  }

  submit(): void {
    this.submitted = true;
    this.error.set('');
    this.notice.set('');
    if (!this.isEmailValid || !this.password) {
      return;
    }
    this.notice.set('La interfaz está lista. La conexión de autenticación se integrará cuando se defina el nuevo backend. No se enviaron tus datos.');
  }
}
