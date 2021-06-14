import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthStatusType } from './auth.model';
import { AuthStatusService } from './auth-status/auth-status.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private authStatusService: AuthStatusService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLogged) {
      return true;
    } else {
      this.authStatusService.updateStatus({ type: AuthStatusType.Fail, message: 'Авторизуйтесь для использования приложения' });
      this.router.navigate([ 'auth' ], { queryParams: { logout: true } });
      return false;
    }
  }
}
