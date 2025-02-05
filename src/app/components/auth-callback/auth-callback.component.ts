import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { CommonModule } from '@angular/common';

interface IUser {
  username: string;
  email: string;
  avatarUrl: string;
  userId: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, OAuthModule],
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }
  user!: IUser;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.user = {
        avatarUrl: params['avatarUrl'],
        email: params['email'],
        userId: params['userId'],
        username: params['username']
      };
    });
  }
}
