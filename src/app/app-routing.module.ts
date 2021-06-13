import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: '', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: '**', redirectTo: '/'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
