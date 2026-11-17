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
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
