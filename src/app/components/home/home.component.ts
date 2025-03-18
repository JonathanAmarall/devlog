import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppComponentBase } from '../shared/components/app-component-base.component';
import { LoadingService } from '../shared/loading.service';

@Component({
  standalone: true,
  imports: [CommonModule, OAuthModule, MatSlideToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends AppComponentBase {
  user: any;
  constructor(
    injector: Injector,
    private loadingService: LoadingService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadingService.show()
    setInterval(() => this._loadingService.show(), 1000)
  }
}
