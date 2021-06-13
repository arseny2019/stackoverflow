import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArchiveQuestionResponse } from '../search.model';
import { SearchService } from '../search.service';

@Injectable()
export class ResultPageResolver implements Resolve<ArchiveQuestionResponse> {
  constructor(private searchService: SearchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArchiveQuestionResponse> | Promise<ArchiveQuestionResponse> | ArchiveQuestionResponse {
    return this.searchService.getPosts(route.params['search'], '', 1, 10);
  }
}
