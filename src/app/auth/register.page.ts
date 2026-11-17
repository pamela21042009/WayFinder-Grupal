import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons';

import { isValidDisplayName, isValidEmail, isValidPassword } from './auth-validation';

addIcons({ eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline });

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  imports: [FormsModule, IonButton, IonContent, IonIcon, IonInput, RouterLink],
})
export class RegisterPage {
  displayName = '';
  email = '';
  password = '';
  passwordConfirmation = '';
  showPassword = false;
  showPasswordConfirmation = false;
  isAdult = false;
  acceptsResponsibleUse = false;
  submitted = false;
  readonly notice = signal('');
  readonly error = signal('');

  get isNameValid(): boolean { return isValidDisplayName(this.displayName); }
  get isEmailValid(): boolean { return isValidEmail(this.email); }
  get isPasswordValid(): boolean { return isValidPassword(this.password); }
  get passwordsMatch(): boolean { return this.passwordConfirmation.length > 0 && this.password === this.passwordConfirmation; }

  submit(): void {
    this.submitted = true;
    this.error.set('');
    this.notice.set('');
    if (!this.isNameValid || !this.isEmailValid || !this.isPasswordValid || !this.passwordsMatch || !this.isAdult || !this.acceptsResponsibleUse) return;
    this.notice.set('El formulario está listo. La creación de cuentas se habilitará al definir el nuevo backend. No se enviaron tus datos.');
  }
}
