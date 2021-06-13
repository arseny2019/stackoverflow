import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Account, AuthStatus, AuthStatusType } from './auth.model';

@Injectable()
export class AuthService {
  users$: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(this.getUsers());
  status$: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>({ type: AuthStatusType.Success, message: '' });

  get isLogged(): boolean {
    return !!(localStorage.getItem('loggedUser') && new Date().getTime() < new Date(<string>localStorage.getItem('expireDate')).getTime());
  }

  constructor(private router: Router) {
    this.users$.subscribe(users => {
      localStorage.setItem('users', JSON.stringify(users));
    })
  }

  login(acc: Account) {
    const user = this.getUser(acc);
    if (user && user.password === acc.password) {
      this.authAccount(acc);
    } else if (user && user.password !== acc.password) {
      this.status$.next({ type: AuthStatusType.Fail, message: 'Неверный пароль' })
    } else {
      this.status$.next({ type: AuthStatusType.Fail, message: `Пользователь ${acc.email} не найден` })
    }
  }

  createAccount(acc: Account): boolean {
    const existed = this.users$.getValue().filter(user => user.email === acc.email).length > 0;
    if (existed) {
      this.status$.next({
        type: AuthStatusType.Fail,
        message: `Пользователь ${acc.email} уже зарегестрирован. Воспользуйтесь функцией восстановления пароля`
      })
    } else {
      this.saveAccount(acc);
    }
    return !existed;
  }

  getUser(acc: Account): Account | undefined {
    return this.users$.getValue().find(user => user.email === acc.email);
  }

  getUsers(): Account[] {
    return localStorage.getItem('users') ? JSON.parse(<string>localStorage.getItem('users')) : [];
  }

  saveAccount(acc: Account) {
    const updatedDB = [ ...this.users$.getValue(), acc ];
    this.users$.next(updatedDB);
    this.status$.next({
      type: AuthStatusType.Success,
      message: `Учетная запись ${acc.email} успешно создана`
    });
    this.router.navigate([ 'auth' ]);
  }

  changeAccountPassword(updatedAcc: Account): void {
    let db = this.users$.getValue();
    let acc = <Account>db.find(user => user.email === updatedAcc.email);
    db.splice(db.indexOf(acc), 1, updatedAcc);
    this.users$.next(db);
    this.status$.next({
      type: AuthStatusType.Success,
      message: `Учетная запись ${updatedAcc.email} успешно обновлена`
    });
    this.router.navigate([ 'auth' ]);
  }

  authAccount(acc: Account) {
    localStorage.setItem('loggedUser', JSON.stringify(acc));
    localStorage.setItem('expireDate', new Date(new Date().getTime() + 3600000).toString());
    this.router.navigate([ '/' ]);
  }

  logoutAccount() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('expireDate');
  }
}
