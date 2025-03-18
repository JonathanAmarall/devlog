import { NotifyService } from './../services/notify.service';
import { Injector } from '@angular/core';
import { MessageService } from './../services/message.service';
import { LoadingService } from '../loading.service';
export abstract class AppComponentBase {
  /**
   *
   */
  readonly _messageService: MessageService;
  readonly _notifyService: NotifyService;
  readonly _loadingService: LoadingService;
  constructor(injector: Injector) {
    this._messageService = injector.get(MessageService);
    this._notifyService = injector.get(NotifyService);
    this._loadingService = injector.get(LoadingService);
  }

  isSuperAdmin(): boolean {
    return true;
  }

  isGranted(permissionName: string): boolean {
    return false;
  }

  isGrantedAny(...permissions: string[]): boolean {
    return true;
  }
}
