import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailQuestion } from '../search.model';
import { SearchService } from '../search.service';

@Injectable()
export class QuestionDetailResolver implements Resolve<DetailQuestion> {

  constructor(private searchService: SearchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailQuestion> | Promise<DetailQuestion> | DetailQuestion {
    return this.searchService.getSinglePost(route.params['id']);
  }
}
