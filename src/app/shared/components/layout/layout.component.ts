import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from '../../animations';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.scss' ],
  animations: [ slideInAnimation ]
})
export class LayoutComponent {
  showSearchLink = false;

  get user(): string {
    return this.authService.currentUser;
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(
      e => {
        this.showSearchLink = e.url.includes('result') || e.url.includes('question');
      }
    )
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet?.activatedRouteData?.animation;
  }

  logout() {
    this.authService.logoutAccount();
  }
}
