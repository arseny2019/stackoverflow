import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from '../auth.model';
import { AuthStatusService } from '../auth-status/auth-status.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {
  form?: FormGroup;

  get status(): AuthStatus {
    return this.authStatusService.status$.getValue();
  }

  constructor(
    private authService: AuthService,
    private authStatusService: AuthStatusService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        (control: FormControl): { [key: string]: boolean } | null => {
          if (this.authService.getUser({
            email: control.value,
            password: ''
          })) {
            return { emailAlreadyUsed: true }
          } else {
            return null;
          }
        }
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    });
  }

  createAccount(): void {
    let result = this.authService.createAccount({
      email: this.form?.get('email')?.value,
      password: this.form?.get('password')?.value
    });
    if (result) {
      this.router.navigate([ 'auth' ]);
    }
  }
}
