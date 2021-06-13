import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { PanelQueryParams, PanelType, Question, User } from '../../search.model';
import { QuickPanelService } from '../../quick-panel/quick-panel.service';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: [ './result-item.component.scss' ]
})
export class ResultItemComponent {
  @Input() question: Question | undefined;
  makeTableQuery$: Subject<PanelQueryParams> = new Subject<PanelQueryParams>();

  constructor(
    private panelService: QuickPanelService,
    private sanitizer: DomSanitizer
  ) {
    this.makeTableQuery$.pipe(
      debounceTime(500),
      tap((params: PanelQueryParams) => {
        this.panelService.showPanel(params.type, params.param);
      })
    ).subscribe();
  }

  sanitize(str: string): string {
    return <string>this.sanitizer.bypassSecurityTrustHtml(str);
  }

  showAuthorTable(user: User): void {
    this.makeTableQuery$.next({ type: PanelType.Author, param: user });
  }

  showTagTable(tag: string): void {
    this.makeTableQuery$.next({ type: PanelType.Tag, param: tag });
  }
}
