import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from '../../animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.scss' ],
  animations: [ slideInAnimation ]
})
export class LayoutComponent {
  showSearchLink = false;

  get user(): string {
    return JSON.parse(<string>localStorage.getItem('loggedUser'))?.email;
  }

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(
      e => {
        this.showSearchLink = (<NavigationEnd>e).url.includes('result') || (<NavigationEnd>e).url.includes('question');
      }
    )
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  logout() {
    this.router.navigate([ 'auth' ], { queryParams: { logout: true } })
  }
}
