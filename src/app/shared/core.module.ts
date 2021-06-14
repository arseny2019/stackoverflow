import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { LoggedGuard } from '../auth/logged.guard';
import { AuthStatusService } from '../auth/auth-status/auth-status.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoggedGuard,
    AuthStatusService
  ]
})
export class CoreModule {
}
