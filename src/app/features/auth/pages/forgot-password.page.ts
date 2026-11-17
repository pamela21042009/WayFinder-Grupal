import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mailOutline } from 'ionicons/icons';

import { isValidEmail } from '../utils/auth-validation';

addIcons({ mailOutline });

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  imports: [FormsModule, IonButton, IonContent, IonIcon, IonInput, RouterLink],
})
export class ForgotPasswordPage {
  email = '';
  submitted = false;
  readonly notice = signal('');
  readonly error = signal('');

  get isEmailValid(): boolean { return isValidEmail(this.email); }

  submit(): void {
    this.submitted = true;
    this.error.set('');
    this.notice.set('');
    if (!this.isEmailValid) return;
    this.notice.set('La recuperación de contraseña se habilitará cuando se defina el nuevo backend. No se envió ningún correo.');
  }
}
