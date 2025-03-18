import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  show(): void {
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }
}
