import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: [ './search-page.component.scss' ]
})
export class SearchPageComponent {
  @ViewChild('search') searchInput?: ElementRef;
  searchString = '';

  updateURL(e: Event) {
    this.searchString = (e.target as HTMLInputElement).value
  }
}
