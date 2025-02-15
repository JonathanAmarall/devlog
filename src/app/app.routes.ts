import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../app/components/home/home.component').then(m => m.HomeComponent) },
    { path: 'login', loadComponent: () => import('../app/components/login/login.component').then(l => l.LoginComponent) },
    { path: 'auth/callback', loadComponent: () => import('../app/components/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent) },
    { path: 'log/log-form', loadComponent: () => import('../app/components/log/log-form/log-form.component').then(l => l.LogFormComponent) },
     { path: '**', redirectTo: '' }, // Redirecionar rotas inválidas
];