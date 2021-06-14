import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthStatusType } from '../auth.model';
import { AuthStatusService } from '../auth-status/auth-status.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private authStatusService: AuthStatusService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    });
    this.route.queryParams.subscribe(params => {
      if (params['logout']) {
        this.authService.logoutAccount();
        this.authStatusService.updateStatus({ type: AuthStatusType.Fail, message: 'Авторизуйтесь для работы с приложением' })
      }
    });
  }

  login() {
    this.authService.login(this.form.value)
  }
}
