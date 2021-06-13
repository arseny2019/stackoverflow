import { Component, Input } from '@angular/core';
import { Question } from '../../search.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: [ './result-table.component.scss' ]
})
export class ResultTableComponent {
  @Input() questions?: Question[];
}
