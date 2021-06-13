import { Component, Input } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DetailQuestion } from '../search.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: [ './question-detail.component.scss' ]
})
export class QuestionDetailComponent {
  @Input() question?: DetailQuestion;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.route.data.subscribe((data: Data) => {
      this.question = data.question;
    })
  }

  sanitize(str: string): string {
    return <string>this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
