import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoggedGuard } from './logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      animation: 'LoginPage'
    },
    canActivate: [ LoggedGuard ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      animation: 'SignupPage'
    },
    canActivate: [ LoggedGuard ]
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    data: {
      animation: 'ForgotPage'
    },
    canActivate: [ LoggedGuard ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AuthRoutingModule {
}
