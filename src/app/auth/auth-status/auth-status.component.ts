import { Component } from '@angular/core';
import { AuthStatus, AuthStatusType } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: [ './auth-status.component.scss' ]
})
export class AuthStatusComponent {

  get status(): AuthStatus {
    return this.authService.status$.getValue();
  }

  constructor(private authService: AuthService) {
    this.authService.status$.subscribe(
      () => setTimeout(() => this.authService.status$.next({ type: AuthStatusType.Success, message: '' }), 7000)
    );
  }
}
