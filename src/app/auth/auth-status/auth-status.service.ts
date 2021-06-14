import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthStatus, AuthStatusType } from '../auth.model';

@Injectable()
export class AuthStatusService {
  status$: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>({ type: AuthStatusType.Success, message: '' });

  updateStatus(status: AuthStatus): void {
    this.status$.next(status);
  }
}
