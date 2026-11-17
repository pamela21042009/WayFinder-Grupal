import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth/login', loadComponent: () => import('./auth/login.page').then((m) => m.LoginPage) },
  { path: 'auth/register', loadComponent: () => import('./auth/register.page').then((m) => m.RegisterPage) },
  { path: 'auth/forgot-password', loadComponent: () => import('./auth/forgot-password.page').then((m) => m.ForgotPasswordPage) },
  { path: 'auth/check-email', loadComponent: () => import('./auth/check-email.page').then((m) => m.CheckEmailPage) },
  { path: 'auth/confirm', loadComponent: () => import('./auth/confirm.page').then((m) => m.ConfirmPage) },
  { path: 'auth/update-password', loadComponent: () => import('./auth/update-password.page').then((m) => m.UpdatePasswordPage) },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then((m) => m.ExplorePage),
  },
  {
    path: 'reports/new',
    data: { view: 'new-report' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'reports/sent',
    data: { view: 'report-sent' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'reports/complaint/new',
    data: { view: 'complaint-form' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'protection/request',
    data: { view: 'protection-request' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'protection/withdraw',
    data: { view: 'withdraw-information' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'invitations/:invitationId',
    data: { view: 'invitation-received' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'moderation',
    data: { view: 'moderation-queue' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'moderation/complaints/:complaintId',
    data: { view: 'moderation-detail' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'admin/roles',
    data: { view: 'global-roles' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/privacy',
    data: { view: 'data-boundaries' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'app-states',
    data: { view: 'app-states' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/new',
    data: { view: 'new-case' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases',
    data: { view: 'case-list' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/reports/from-comment/:commentId',
    data: { view: 'comment-conversion' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/reports/:reportId/location',
    data: { view: 'report-location' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/reports/:reportId',
    data: { view: 'report-detail' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/analysis',
    data: { view: 'analysis' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/timeline',
    data: { view: 'timeline' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/collaborators',
    data: { view: 'collaborators' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/history',
    data: { view: 'history' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/settings',
    data: { view: 'case-settings' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/clues/new',
    data: { view: 'new-clue' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId/events/new',
    data: { view: 'new-event' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: 'my-cases/:caseId',
    data: { view: 'case-detail' },
    loadComponent: () => import('./casework/casework.page').then((m) => m.CaseworkPage),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
