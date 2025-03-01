import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, OAuthModule],
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent {
  constructor(
    private  authService: AuthService) { }

  ngOnInit(): void {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
     this.authService.githubAuthorize(code)
    }
  }
}
