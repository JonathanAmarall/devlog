import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const BASE_URL = environment.apiUrl;

export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, private oauthService: OAuthService, private router: Router) {
    this.configureOAuth();
  }

  private configureOAuth(): void {
    const authConfig: AuthConfig = {
      issuer: '', // Não usado para GitHub, mas necessário para o contrato
      clientId: 'Ov23liMqYIA5VGL6M2cl', // Obtido no GitHub
      redirectUri: window.location.origin + '/auth/callback',
      loginUrl: `${BASE_URL}/auth/github/login`,
      tokenEndpoint: `${BASE_URL}/auth/github/callback`, // Backend
      responseType: 'code', // OAuth Code Flow
      scope: 'read:user user:email', // Scopes do GitHub
      showDebugInformation: true, // Para depuração
      requireHttps: false
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(email: string, password: string) {
    this.http.post<LoginResponse>(`${BASE_URL}/api/v1/users/login`, {
      email, password
    }).subscribe({
      next: res => {
        console.log(res)
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('authToken', JSON.stringify(res.token))
        this.router.navigateByUrl('/')
      }
    })
  }

  loginWithGithub(): void {
    window.location.href = `${BASE_URL}/auth/github/login`;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('auth/login')
  }

  getUserData(code: string) {
    return this.http.get(`${BASE_URL}/auth/github/callback?code=${code}`);
  }

  isAuthenticated(): boolean {
    return false
  }
}