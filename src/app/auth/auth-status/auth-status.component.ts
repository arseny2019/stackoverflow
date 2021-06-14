import { Component } from '@angular/core';
import { AuthStatus } from '../auth.model';
import { AuthStatusService } from './auth-status.service';

@Component({
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrls: [ './auth-status.component.scss' ]
})
export class AuthStatusComponent {

  get status(): AuthStatus {
    return this.authStatusService.status$.getValue();
  }

  constructor(private authStatusService: AuthStatusService) {
    this.authStatusService.status$.subscribe();
  }
}
