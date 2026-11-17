import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosedOutline } from 'ionicons/icons';

import { isValidPassword } from '../utils/auth-validation';

addIcons({ eyeOffOutline, eyeOutline, lockClosedOutline });

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  imports: [FormsModule, IonButton, IonContent, IonIcon, IonInput, RouterLink],
})
export class UpdatePasswordPage {
  password = '';
  confirmation = '';
  showPassword = false;
  showConfirmation = false;
  submitted = false;
  readonly notice = signal('');
  readonly error = signal('');

  get isPasswordValid(): boolean { return isValidPassword(this.password); }
  get passwordsMatch(): boolean { return this.confirmation.length > 0 && this.password === this.confirmation; }

  submit(): void {
    this.submitted = true;
    this.error.set('');
    this.notice.set('');
    if (!this.isPasswordValid || !this.passwordsMatch) return;
    this.notice.set('El cambio de contraseña se habilitará al definir el nuevo backend. No se guardó ningún cambio.');
  }
}
