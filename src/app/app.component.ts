import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SidenavComponent } from './components/shared/components/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OAuthModule, SidenavComponent, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'devlog';

  showSidenav: boolean = true;

  constructor(private router: Router) {
    // Verifica a rota sempre que houver alteração
    this.router.events.subscribe(() => {
      // Lista de rotas onde o Sidenav NÃO deve aparecer
      const noSidenavRoutes = ['/auth/login', '/auth/callback'];
      this.showSidenav = !noSidenavRoutes.includes(this.router.url);
    });
  }
}
