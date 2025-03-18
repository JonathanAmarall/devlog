import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '../components/app-component-base.component';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule, CommonModule],
  template: `
  <div *ngIf="loading | async" class="loading-container">
    <mat-spinner></mat-spinner>
  </div>`,
  styleUrl: './loading.component.css'
})
export class LoadingComponent extends AppComponentBase {
  loading: Observable<boolean> = new Observable<boolean>();

  constructor(public injector: Injector) {
    super(injector);
    this.setLoading();
  }

  setLoading() {
    this.loading = this._loadingService.getLoading();
  }
}
