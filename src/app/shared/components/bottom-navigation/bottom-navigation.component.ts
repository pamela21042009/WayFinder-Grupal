import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonToast } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, compass, compassOutline, home, mailOutline, personOutline } from 'ionicons/icons';

addIcons({ add, compass, compassOutline, home, mailOutline, personOutline });

export type MainNavigationSection = 'home' | 'explore';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss',
  imports: [IonIcon, IonToast, RouterLink],
})
export class BottomNavigationComponent {
  @Input({ required: true }) activeSection!: MainNavigationSection;
  @Output() homeSelected = new EventEmitter<void>();

  toastOpen = false;
  toastMessage = '';

  onHomeSelected(): void {
    if (this.activeSection === 'home') {
      this.homeSelected.emit();
    }
  }

  showToast(message: string): void {
    this.toastMessage = message;
    this.toastOpen = true;
  }
}
