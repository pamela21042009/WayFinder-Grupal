import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';

addIcons({ checkmarkCircleOutline });

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  imports: [IonButton, IonContent, IonIcon, RouterLink],
})
export class ConfirmPage {}
