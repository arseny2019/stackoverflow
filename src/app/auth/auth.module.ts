import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthStatusComponent } from './auth-status/auth-status.component';
import { AuthGuard } from './auth.guard';
import { LoggedGuard } from './logged.guard';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    AuthStatusComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoggedGuard
  ]
})
export class AuthModule {
}
