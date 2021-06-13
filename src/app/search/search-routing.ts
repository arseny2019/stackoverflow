import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ResultPageResolver } from './result-page/result-page.resolver';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionDetailResolver } from './question-detail/question-detail.resolver';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: SearchPageComponent,
    data: {
      animation: 'SearchPage'
    },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'result/:search',
    component: ResultPageComponent,
    data: {
      animation: 'ResultPage'
    },
    resolve: {
      response: ResultPageResolver
    },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'question/:id',
    component: QuestionDetailComponent,
    data: {
      animation: 'QuestionPage'
    },
    resolve: {
      question: QuestionDetailResolver
    },
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class SearchRoutingModule {
}
