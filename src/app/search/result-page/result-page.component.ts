import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ArchiveQuestionResponse, Question } from '../search.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: [ './result-page.component.scss' ]
})
export class ResultPageComponent {
  questions: Question[] = [];
  page: number = 1;
  hasMore: boolean = false;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute) {
    this.route.data.subscribe((data: Data) => this.responseHandler(<ArchiveQuestionResponse>data.response));
  }

  loadMoreQuestion() {
    this.searchService.getPosts(this.route.snapshot.params['search'], '', this.page, 10).subscribe(
      (response: ArchiveQuestionResponse) => this.responseHandler(response)
    )
  }

  responseHandler(response: ArchiveQuestionResponse) {
    this.hasMore = response.has_more;
    if (this.hasMore) this.page++;
    this.questions.push(...response.items);
  }
}
