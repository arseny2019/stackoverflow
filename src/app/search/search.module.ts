import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ResultItemComponent } from './result-page/result-item/result-item.component';
import { SearchService } from './search.service';
import { ResultPageResolver } from './result-page/result-page.resolver';
import { QuestionDetailResolver } from './question-detail/question-detail.resolver';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { QuickPanelService } from './quick-panel/quick-panel.service';
import { ResultTableComponent } from './result-page/result-table/result-table.component';
import { SearchRoutingModule } from './search-routing';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [
    QuestionDetailComponent,
    SearchPageComponent,
    ResultPageComponent,
    ResultItemComponent,
    QuickPanelComponent,
    ResultTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchRoutingModule,
    FormsModule
  ],
  providers: [
    SearchService,
    ResultPageResolver,
    QuestionDetailResolver,
    QuickPanelService,
    AuthGuard
  ]
})
export class SearchModule {
}
