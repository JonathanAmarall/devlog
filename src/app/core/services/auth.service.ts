import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { authConfig } from '../auth/auth.config';
import { tap } from 'rxjs';

const BASE_URL = environment.apiUrl;

export interface LoginResponse {
  user: User;
  token: Token;
}

export interface Token {
  value: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
}

export function initAuth(oauthService: OAuthService): () => Promise<void> {
  return async () => {
    oauthService.configure(authConfig);
    await oauthService.loadDiscoveryDocumentAndTryLogin();
  };
}

@Injectable({
  providedIn: 'root',
  deps: [OAuthService],
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private router: Router,
    private tokenService: TokenService) {
    this.oauthService.configure(authConfig);

    oauthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(console.log);
  }

  login(email: string, password: string) {
    this.http.post<LoginResponse>(`${BASE_URL}/api/v1/users/login`, {
      email, password
    }).subscribe({
      next: res => {
        this.tokenService.setToken(res.token.value);
        this.router.navigateByUrl('/')
      }
    })
  }

  loginWithGithub(): void {
    this.oauthService.initLoginFlow();
  }

  githubUser() {
    this.http.get(`${BASE_URL}/auth/user`).subscribe();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigateByUrl('auth/login')
  }

  isAuthenticated(): boolean {
    return false
  }

  githubAuthorize(code: string) {
    this.http.post<LoginResponse>(`${BASE_URL}/auth/github/login`, { code })
      .pipe(
        tap(res => {
          this.tokenService.setToken(res.token.value);
          this.router.navigateByUrl('/')
        })
      ).subscribe();
  }
}