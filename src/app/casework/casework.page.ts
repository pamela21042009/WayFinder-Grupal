import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  briefcaseOutline,
  calendarClearOutline,
  checkmarkCircle,
  chevronForwardOutline,
  documentTextOutline,
  eyeOutline,
  informationCircleOutline,
  lockClosedOutline,
  locationOutline,
  mailOutline,
  peopleOutline,
  personCircleOutline,
  sparklesOutline,
  sendOutline,
  shieldCheckmarkOutline,
  timeOutline,
} from 'ionicons/icons';

addIcons({
  arrowBackOutline,
  briefcaseOutline,
  calendarClearOutline,
  checkmarkCircle,
  chevronForwardOutline,
  documentTextOutline,
  eyeOutline,
  informationCircleOutline,
  lockClosedOutline,
  locationOutline,
  mailOutline,
  peopleOutline,
  personCircleOutline,
  sparklesOutline,
  sendOutline,
  shieldCheckmarkOutline,
  timeOutline,
});

interface LocalCase {
  id: string;
  title: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-casework',
  templateUrl: './casework.page.html',
  imports: [AsyncPipe, FormsModule, IonContent, IonIcon, RouterLink],
})
export class CaseworkPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly view$ = this.route.data;
  readonly caseId = this.route.snapshot.paramMap.get('caseId') ?? 'WF-EJEMPLO-01';
  readonly reportId = this.route.snapshot.paramMap.get('reportId') ?? 'REP-EJEMPLO-01';

  fullName = '';
  email = '';
  phone = '';
  relationship = '';
  details = '';
  consent = false;
  inviteEmail = '';
  inviteSent = false;
  clueTitle = '';
  clueDescription = '';
  eventTitle = '';
  eventDescription = '';
  eventDate = '';
  caseStatus = 'En seguimiento';
  publicUpdates = true;
  caseSettingsSaved = false;
  actionSaved = false;
  complaintReason = '';
  complaintDetails = '';
  protectionType = '';
  protectionDetails = '';
  moderationDecision = '';
  moderationNote = '';
  moderationSaved = false;
  readonly complaintId = this.route.snapshot.paramMap.get('complaintId') ?? 'DEN-EJEMPLO-01';
  readonly invitationId = this.route.snapshot.paramMap.get('invitationId') ?? 'INV-EJEMPLO-01';
  readonly commentId = this.route.snapshot.paramMap.get('commentId') ?? 'COM-EJEMPLO-01';
  withdrawalReference = '';
  withdrawalDetails = '';
  withdrawalEmail = '';
  invitationResponse = '';
  conversionNote = '';
  conversionSaved = false;
  newCaseTitle = '';
  newCaseLocation = '';
  newCaseDescription = '';
  localCases: LocalCase[] = this.loadLocalCases();

  readonly report = {
    id: 'REP-EJEMPLO-01',
    date: '17 nov. 2026 · 10:42 a. m.',
    author: 'Persona colaboradora (ejemplo)',
    type: 'Posible avistamiento',
    status: 'Pendiente de revisión',
    details: 'Contenido de ejemplo para mostrar cómo se verá un aporte privado al equipo del caso.',
  };

  submitReport(): void {
    // El servicio de datos pendiente se encargará del envío y almacenamiento reales.
    void this.router.navigateByUrl('/reports/sent');
  }

  saveEntry(): void {
    this.actionSaved = true;
  }

  saveSettings(): void {
    this.caseSettingsSaved = true;
  }

  submitSafetyRequest(): void {
    this.actionSaved = true;
  }

  saveModeration(): void {
    this.moderationSaved = true;
  }

  respondToInvitation(response: 'accepted' | 'declined'): void {
    this.invitationResponse = response;
  }

  convertComment(): void {
    this.conversionSaved = true;
  }

  createLocalCase(): void {
    const title = this.newCaseTitle.trim();
    const location = this.newCaseLocation.trim();
    if (!title || !location || typeof localStorage === 'undefined') return;

    const localCase: LocalCase = {
      id: `WF-LOCAL-${Date.now().toString().slice(-6)}`,
      title,
      location,
      description: this.newCaseDescription.trim(),
    };
    this.localCases = [localCase, ...this.localCases];
    localStorage.setItem('wayfinder.localCases', JSON.stringify(this.localCases));
    void this.router.navigateByUrl('/my-cases');
  }

  private loadLocalCases(): LocalCase[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const saved = localStorage.getItem('wayfinder.localCases');
      return saved ? (JSON.parse(saved) as LocalCase[]) : [];
    } catch {
      return [];
    }
  }
}
