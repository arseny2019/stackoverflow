import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthStatusType } from '../auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  form?: FormGroup;

  constructor(
    private authService: AuthService,
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
        this.authService.status$.next({ type: AuthStatusType.Fail, message: 'Авторизуйтесь для работы с приложением' })
      }
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login({
        email: this.form?.get('email')?.value,
        password: this.form?.get('password')?.value
      }
    )
  }
}
