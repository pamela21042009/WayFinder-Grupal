import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth/login', loadComponent: () => import('./features/auth/pages/login.page').then((m) => m.LoginPage) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/pages/register.page').then((m) => m.RegisterPage) },
  { path: 'auth/forgot-password', loadComponent: () => import('./features/auth/pages/forgot-password.page').then((m) => m.ForgotPasswordPage) },
  { path: 'auth/check-email', loadComponent: () => import('./features/auth/pages/check-email.page').then((m) => m.CheckEmailPage) },
  { path: 'auth/confirm', loadComponent: () => import('./features/auth/pages/confirm.page').then((m) => m.ConfirmPage) },
  { path: 'auth/update-password', loadComponent: () => import('./features/auth/pages/update-password.page').then((m) => m.UpdatePasswordPage) },
  {
    path: 'home',
    loadComponent: () => import('./features/feed/pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'explore',
    loadComponent: () => import('./features/explore/pages/explore.page').then((m) => m.ExplorePage),
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
