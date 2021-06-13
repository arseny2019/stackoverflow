import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStatus } from '../auth.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: [ './forgot.component.scss' ]
})
export class ForgotComponent {

  form?: FormGroup;

  get status(): AuthStatus {
    return this.authService.status$.getValue();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          (control: FormControl): { [key: string]: boolean } | null => {
            if (this.authService.getUser({
              email: control.value,
              password: ''
            })) {
              return null;
            } else {
              return { emailNotFound: true }
            }
          }
        ]),
        password1: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      }, {
        validators: (form: FormGroup): { [key: string]: boolean } | null => {
          if (form.get('password1')?.value === form.get('password2')?.value) {
            return null;
          } else {
            return { notEqualPasswords: true };
          }
        }
      }
    );
  }

  changePassword(): void {
    let updatedAcc = {
      email: this.form?.get('email')?.value,
      password: this.form?.get('password1')?.value
    };
    this.authService.changeAccountPassword(updatedAcc)
  }
}
