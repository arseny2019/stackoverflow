import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArchiveQuestionResponse, PanelQueryParams, PanelType, Question, User } from '../search.model';
import { SearchService } from '../search.service';

@Injectable()
export class QuickPanelService {
  quickPanel$: BehaviorSubject<PanelQueryParams> = new BehaviorSubject<PanelQueryParams>(
    { type: PanelType.None, param: '' });
  panelContent: Question[] = [];

  get panelType(): PanelType {
    return this.quickPanel$.getValue().type;
  }

  get panelTitle(): string {
    switch (this.panelType) {
      case PanelType.Author:
        return (<User>this.quickPanel$.getValue().param).display_name;
      case PanelType.Tag:
        return <string>this.quickPanel$.getValue().param;
    }
    return '';
  }

  constructor(private searchService: SearchService) {
    this.quickPanel$.subscribe(
      panelState => {
        switch (panelState.type) {
          case PanelType.Author:
            this.searchService.getPostsByAuthor(<User>panelState.param, 10).subscribe(
              (response: ArchiveQuestionResponse) => this.panelContent = response.items
            );
            break;
          case PanelType.Tag:
            this.searchService.getPosts('', <string>panelState.param, 1, 10).subscribe(
              (response: ArchiveQuestionResponse) => this.panelContent = response.items
            );
            break;
          case PanelType.None:
            this.panelContent = [];
            break;
        }
      }
    )
  }

  showPanel(type: PanelType, param: string | User): void {
    this.quickPanel$.next({ type, param });
    document.body.style.overflow = 'hidden';
  }

  hidePanel(): void {
    this.quickPanel$.next({ type: PanelType.None, param: '' });
    document.body.style.overflow = 'auto';
  }
}
