import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        
        canActivate: [],
        children: [

            {
                path: 'log/home',
                loadComponent: () => import('../app/components/home/home.component').then(m => m.HomeComponent),

            },
            {
                path: 'log/log-form',
                loadComponent: () => import('../app/components/log/log-form/log-form.component').then(l => l.LogFormComponent),
            },
            {
                path: 'log/log-table',
                loadComponent: () => import('../app/components/log/log-table/log-table.component').then(l => l.LogTableComponent),
            },
        ]
    },
    {
        path: 'auth/login',
        loadComponent: () => import('../app/components/login/login.component').then(l => l.LoginComponent)
    },
    {
        path: 'auth/callback',
        loadComponent: () => import('../app/components/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent)
    },
    //{ path: '**', redirectTo: '' }
];