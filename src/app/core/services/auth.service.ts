import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, private oauthService: OAuthService) {
    this.configureOAuth();
  }

  private configureOAuth(): void {
    const authConfig: AuthConfig = {
      issuer: '', // Não usado para GitHub, mas necessário para o contrato
      clientId: 'Ov23liMqYIA5VGL6M2cl', // Obtido no GitHub
      redirectUri: window.location.origin + '/auth/callback',
      loginUrl: 'http://localhost:5000/auth/github/login',
      tokenEndpoint: 'http://localhost:5000/auth/github/callback', // Backend
      responseType: 'code', // OAuth Code Flow
      scope: 'read:user user:email', // Scopes do GitHub
      showDebugInformation: true, // Para depuração
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    window.location.href = 'http://localhost:5000/auth/github/login';
  }

  logout(): void {
    window.location.href = 'http://localhost:5000/auth/github/logout';
  }

  getUserData(code: string) {
    return this.http.get(`http://localhost:5000/auth/github/callback?code=${code}`);
  }
}