import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { QuickPanelService } from './quick-panel.service';
import { PanelType, Question } from '../search.model';

@Component({
  selector: 'app-quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: [ './quick-panel.component.scss' ]
})
export class QuickPanelComponent {

  get isActive(): boolean {
    return this.panelService.quickPanel$.getValue().type !== PanelType.None;
  }

  get type(): PanelType {
    return this.panelService.quickPanel$.getValue().type
  }

  get title(): string {
    return this.panelService.panelTitle;
  }

  get questions(): Question[] {
    return this.panelService.panelContent;
  }

  constructor(
    private panelService: QuickPanelService,
    private sanitizer: DomSanitizer
  ) {
    this.panelService.quickPanel$.subscribe()
  }

  hidePanel() {
    this.panelService.hidePanel();
  }

  sanitize(str: string): string {
    return <string>this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
