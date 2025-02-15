import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SidenavComponent } from './components/shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OAuthModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devlog';
}
