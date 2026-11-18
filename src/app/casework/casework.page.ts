import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  arrowForwardOutline,
  briefcaseOutline,
  calendarClearOutline,
  chatbubbleEllipsesOutline,
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
  searchOutline,
  sparklesOutline,
  sendOutline,
  shieldCheckmarkOutline,
  timeOutline,
} from 'ionicons/icons';

addIcons({
  arrowBackOutline,
  arrowForwardOutline,
  briefcaseOutline,
  calendarClearOutline,
  chatbubbleEllipsesOutline,
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
  searchOutline,
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

interface DemoReport {
  id: string;
  date: string;
  author: string;
  type: string;
  status: 'Pendiente de revisión' | 'Revisado';
  details: string;
  notes: string[];
}

type CaseListItem = LocalCase & { status: string; isLocal: boolean };

interface DemoSuggestion {
  id: string;
  kind: string;
  label: string;
  score?: string;
  title: string;
  description: string;
  reasonTitle: string;
  reason: string;
  reportId: string;
  status: 'Pendiente de revisión' | 'Revisada por el equipo';
}

interface DemoTimelineEvent {
  id: string;
  date: string;
  time: string;
  type: 'Reporte' | 'Análisis' | 'Expediente';
  title: string;
  description: string;
  actor: string;
}

interface DemoCollaborator {
  name: string;
  email: string;
  initials: string;
  role: 'Responsable' | 'Editor';
}

interface DemoHistoryEntry {
  date: string;
  type: 'Análisis' | 'Reporte' | 'Expediente';
  actor: string;
  detail: string;
}

interface DemoModerationItem {
  id: string;
  title: string;
  category: string;
  received: string;
  status: 'Pendiente' | 'En revisión' | 'Resuelta';
  priority: 'Alta' | 'Normal';
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
  get reportId(): string {
    return this.route.snapshot.paramMap.get('reportId') ?? 'REP-EJEMPLO-01';
  }

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
  moderationFilter: 'all' | 'pending' | 'reviewing' | 'resolved' = 'all';
  moderationSearch = '';
  caseName = 'Valeria Rodríguez · caso de ejemplo';
  internalNote = '';
  contentType = 'Publicación de un caso';
  complaintReference = '';
  complaintEmail = '';
  contentReference = '';
  protectionEmail = '';
  withdrawalLocation = 'En una publicación';
  safetyFeedback = '';
  settingsFeedback = '';
  get complaintId(): string {
    return this.route.snapshot.paramMap.get('complaintId') ?? 'DEN-EJEMPLO-01';
  }
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
  caseSearchTerm = '';
  caseStatusFilter: 'all' | 'active' | 'draft' = 'all';
  reportSearchTerm = '';
  reportStatusFilter: 'all' | 'pending' | 'reviewed' = 'all';
  private classificationForReportId = this.reportId;
  private classificationValue: DemoReport['status'] = 'Pendiente de revisión';
  reportNote = '';
  reportFeedback = '';
  analysisFilter: 'all' | 'pending' | 'reviewed' = 'all';
  timelineFilter: 'all' | 'Reporte' | 'Análisis' | 'Expediente' = 'all';
  timelineSearch = '';
  collaboratorFilter: 'all' | 'Responsable' | 'Editor' = 'all';
  historyFilter: 'all' | 'Análisis' | 'Reporte' | 'Expediente' = 'all';
  historySearch = '';
  preparedInvites: string[] = [];

  readonly suggestions: DemoSuggestion[] = [
    {
      id: 'SUG-EJEMPLO-01', kind: 'POSIBLE SIMILITUD', label: 'Coincidencia sugerida', score: '74%',
      title: 'Reporte REP-EJEMPLO-01',
      description: 'Algunos detalles generales del reporte se parecen a otros datos del expediente de ejemplo.',
      reasonTitle: 'Factores señalados', reason: 'Descripción general · Fecha aproximada',
      reportId: 'REP-EJEMPLO-01', status: 'Pendiente de revisión',
    },
    {
      id: 'SUG-EJEMPLO-02', kind: 'INFORMACIÓN INCOMPLETA', label: 'Dato por aclarar',
      title: 'Reporte REP-EJEMPLO-02',
      description: 'El reporte de ejemplo podría necesitar más contexto para que el equipo lo revise.',
      reasonTitle: 'Dato por aclarar', reason: 'Referencia temporal aproximada',
      reportId: 'REP-EJEMPLO-02', status: 'Pendiente de revisión',
    },
  ];

  readonly timelineEvents: DemoTimelineEvent[] = [
    { id: 'EVT-01', date: '17 nov. 2026', time: '10:42 a. m.', type: 'Reporte', title: 'Se recibió un aporte', description: 'El aporte está pendiente de revisión por el equipo.', actor: 'Sistema' },
    { id: 'EVT-02', date: '17 nov. 2026', time: '10:43 a. m.', type: 'Análisis', title: 'Sugerencias de muestra disponibles', description: 'Se generaron sugerencias para revisión humana; no confirman información.', actor: 'Sistema' },
    { id: 'EVT-03', date: '16 nov. 2026', time: '4:15 p. m.', type: 'Expediente', title: 'Se abrió el espacio de trabajo', description: 'Inicio de la cronología privada del expediente de ejemplo.', actor: 'Responsable (ejemplo)' },
  ];

  readonly collaborators: DemoCollaborator[] = [
    { name: 'Responsable (ejemplo)', email: 'responsable@ejemplo.test', initials: 'PR', role: 'Responsable' },
    { name: 'Editor de muestra', email: 'editor@ejemplo.test', initials: 'ED', role: 'Editor' },
  ];

  readonly historyEntries: DemoHistoryEntry[] = [
    { date: '17 nov. · 10:43 a. m.', type: 'Análisis', actor: 'Sistema', detail: 'Sugerencias de ejemplo generadas' },
    { date: '17 nov. · 10:42 a. m.', type: 'Reporte', actor: 'Colaborador/a (ejemplo)', detail: 'Aporte de muestra recibido' },
    { date: '16 nov. · 4:15 p. m.', type: 'Expediente', actor: 'Responsable (ejemplo)', detail: 'Expediente de ejemplo creado' },
  ];

  readonly moderationItems: DemoModerationItem[] = [
    { id: 'DEN-EJEMPLO-01', title: 'Posible exposición de datos personales', category: 'Publicación de caso', received: 'Hoy · 9:18 a. m.', status: 'Pendiente', priority: 'Alta' },
    { id: 'DEN-EJEMPLO-02', title: 'Solicitud de protección de imagen', category: 'Imagen', received: 'Hoy · 8:05 a. m.', status: 'Pendiente', priority: 'Normal' },
    { id: 'DEN-EJEMPLO-03', title: 'Denuncia de comentario', category: 'Comentario', received: 'Ayer · 4:20 p. m.', status: 'En revisión', priority: 'Normal' },
    { id: 'DEN-EJEMPLO-04', title: 'Solicitud sobre información de perfil', category: 'Perfil', received: 'Ayer · 11:30 a. m.', status: 'Resuelta', priority: 'Normal' },
    { id: 'DEN-EJEMPLO-05', title: 'Reporte de contenido repetido', category: 'Publicación de caso', received: '16 nov. · 2:10 p. m.', status: 'Resuelta', priority: 'Normal' },
  ];

  readonly demoReports: DemoReport[] = [
    {
      id: 'REP-EJEMPLO-01', date: '17 nov. 2026 · 10:42 a. m.',
      author: 'Persona colaboradora (ejemplo)', type: 'Posible avistamiento',
      status: 'Pendiente de revisión',
      details: 'Contenido de ejemplo para mostrar cómo se verá un aporte privado al equipo del caso.', notes: [],
    },
    {
      id: 'REP-EJEMPLO-02', date: '16 nov. 2026 · 3:20 p. m.',
      author: 'Colaborador/a (ejemplo)', type: 'Información adicional',
      status: 'Revisado',
      details: 'Segundo aporte ficticio para explorar la bandeja y el estado de revisión.', notes: [],
    },
  ];

  get selectedReport(): DemoReport {
    return this.demoReports.find((item) => item.id === this.reportId) ?? this.demoReports[0];
  }

  get reportClassification(): DemoReport['status'] {
    if (this.classificationForReportId !== this.reportId) {
      this.classificationForReportId = this.reportId;
      this.classificationValue = this.selectedReport.status;
    }
    return this.classificationValue;
  }

  set reportClassification(value: DemoReport['status']) {
    this.classificationForReportId = this.reportId;
    this.classificationValue = value;
  }

  get filteredReports(): DemoReport[] {
    const query = this.reportSearchTerm.trim().toLocaleLowerCase();
    return this.demoReports.filter((item) => {
      const matchesStatus = this.reportStatusFilter === 'all'
        || (this.reportStatusFilter === 'pending' && item.status === 'Pendiente de revisión')
        || (this.reportStatusFilter === 'reviewed' && item.status === 'Revisado');
      const matchesQuery = !query || `${item.id} ${item.type} ${item.author}`.toLocaleLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }

  get filteredCases(): CaseListItem[] {
    const cases: CaseListItem[] = [
      ...this.localCases.map((item) => ({ ...item, status: 'En preparación', isLocal: true })),
      {
        id: 'WF-EJEMPLO-01', title: 'Valeria Rodríguez', location: 'Santo Domingo',
        description: 'Última actividad: hoy · Datos ficticios de interfaz', status: 'En seguimiento', isLocal: false,
      },
    ];
    const query = this.caseSearchTerm.trim().toLocaleLowerCase();
    return cases.filter((item) => {
      const matchesStatus = this.caseStatusFilter === 'all'
        || (this.caseStatusFilter === 'active' && item.status === 'En seguimiento')
        || (this.caseStatusFilter === 'draft' && item.status === 'En preparación');
      const matchesQuery = !query || `${item.id} ${item.title} ${item.location} ${item.description}`.toLocaleLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }

  get pendingReportCount(): number {
    return this.demoReports.filter((item) => item.status === 'Pendiente de revisión').length;
  }

  get totalCaseCount(): number {
    return this.localCases.length + 1;
  }

  get adjacentReport(): DemoReport {
    const currentIndex = this.demoReports.findIndex((item) => item.id === this.selectedReport.id);
    return this.demoReports[(currentIndex + 1) % this.demoReports.length];
  }

  get adjacentReportLabel(): string {
    return this.selectedReport.id === this.demoReports[0].id ? 'Siguiente aporte' : 'Aporte anterior';
  }

  get pendingSuggestionCount(): number {
    return this.suggestions.filter((item) => item.status === 'Pendiente de revisión').length;
  }

  get filteredSuggestions(): DemoSuggestion[] {
    return this.suggestions.filter((item) => this.analysisFilter === 'all'
      || (this.analysisFilter === 'pending' && item.status === 'Pendiente de revisión')
      || (this.analysisFilter === 'reviewed' && item.status === 'Revisada por el equipo'));
  }

  get filteredTimelineEvents(): DemoTimelineEvent[] {
    const query = this.timelineSearch.trim().toLocaleLowerCase();
    return this.timelineEvents.filter((item) => {
      const matchesType = this.timelineFilter === 'all' || item.type === this.timelineFilter;
      const matchesQuery = !query || `${item.title} ${item.description} ${item.actor} ${item.type}`.toLocaleLowerCase().includes(query);
      return matchesType && matchesQuery;
    });
  }

  get filteredCollaborators(): DemoCollaborator[] {
    return this.collaborators.filter((item) => this.collaboratorFilter === 'all' || item.role === this.collaboratorFilter);
  }

  get filteredHistoryEntries(): DemoHistoryEntry[] {
    const query = this.historySearch.trim().toLocaleLowerCase();
    return this.historyEntries.filter((item) => {
      const matchesType = this.historyFilter === 'all' || item.type === this.historyFilter;
      const matchesQuery = !query || `${item.date} ${item.type} ${item.actor} ${item.detail}`.toLocaleLowerCase().includes(query);
      return matchesType && matchesQuery;
    });
  }

  get filteredModerationItems(): DemoModerationItem[] {
    const query = this.moderationSearch.trim().toLocaleLowerCase();
    return this.moderationItems.filter((item) => {
      const matchesStatus = this.moderationFilter === 'all'
        ? item.status !== 'Resuelta'
        : (this.moderationFilter === 'pending' && item.status === 'Pendiente')
          || (this.moderationFilter === 'reviewing' && item.status === 'En revisión')
          || (this.moderationFilter === 'resolved' && item.status === 'Resuelta');
      const matchesQuery = !query || `${item.id} ${item.title} ${item.category} ${item.priority}`.toLocaleLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }

  get selectedModerationItem(): DemoModerationItem {
    return this.moderationItems.find((item) => item.id === this.complaintId) ?? this.moderationItems[0];
  }

  get pendingModerationCount(): number {
    return this.moderationItems.filter((item) => item.status === 'Pendiente').length;
  }

  get reviewingModerationCount(): number {
    return this.moderationItems.filter((item) => item.status === 'En revisión').length;
  }

  get resolvedModerationCount(): number {
    return this.moderationItems.filter((item) => item.status === 'Resuelta').length;
  }

  setCaseFilter(filter: 'all' | 'active' | 'draft'): void {
    this.caseStatusFilter = filter;
  }

  setReportFilter(filter: 'all' | 'pending' | 'reviewed'): void {
    this.reportStatusFilter = filter;
  }

  reviewSuggestion(id: string): void {
    const suggestion = this.suggestions.find((item) => item.id === id);
    if (suggestion) suggestion.status = 'Revisada por el equipo';
  }

  prepareInvite(): void {
    const email = this.inviteEmail.trim().toLocaleLowerCase();
    if (!email || this.preparedInvites.includes(email)) return;
    this.preparedInvites = [email, ...this.preparedInvites];
    this.inviteSent = true;
  }

  saveReportReview(): void {
    this.selectedReport.status = this.reportClassification;
    this.reportFeedback = 'Estado actualizado en esta vista de ejemplo. No se ha guardado en un servidor.';
  }

  addReportNote(): void {
    const note = this.reportNote.trim();
    if (!note) return;
    this.selectedReport.notes.unshift(note);
    this.reportNote = '';
    this.reportFeedback = 'Nota añadida a esta vista de ejemplo; no se ha guardado en un servidor.';
  }

  submitReport(): void {
    // El servicio de datos pendiente se encargará del envío y almacenamiento reales.
    void this.router.navigateByUrl('/reports/sent');
  }

  saveEntry(): void {
    this.actionSaved = true;
  }

  saveSettings(): void {
    this.caseSettingsSaved = true;
    this.settingsFeedback = 'Cambios aplicados solo a esta vista de ejemplo; no se guardaron en un servidor.';
  }

  submitSafetyRequest(): void {
    this.actionSaved = true;
    const view = this.route.snapshot.data['view'];
    this.safetyFeedback = view === 'complaint-form'
      ? 'Vista previa lista. La denuncia no se envió ni se creó un caso real.'
      : view === 'withdraw-information'
        ? 'Solicitud de retirada preparada solo para esta demostración; no se envió.'
        : 'Solicitud de protección preparada solo para esta demostración; no se envió.';
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
