import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../app/components/home/home.component').then(m => m.HomeComponent) },
    { path: 'auth/callback', loadComponent: () => import('../app/components/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent) },
     { path: '**', redirectTo: '' }, // Redirecionar rotas inválidas
];