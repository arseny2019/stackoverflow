import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArchiveQuestionResponse, ArchiveQuestionResponseByAuthor, DetailQuestion, QueryParams, User } from './search.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  searchQuery = '';

  constructor(private http: HttpClient) { }

  getPosts(title: string, tag: string, page: number, pagesize: number): Observable<ArchiveQuestionResponse> {
    const params: QueryParams = {
      page,
      pagesize,
      site: environment.siteDomain,
      key: environment.key,
      filter: environment.archiveFilter,
      order: 'desc',
      sort: 'activity'
    };
    if (tag) {
      params.tagged = tag;
      params.sort = 'votes';
    } else {
      params.title = title;
      this.searchQuery = title;
    }
    return this.http.get<ArchiveQuestionResponse>(`${environment.dbUrl}/search/advanced`, {
      params: { ...params }
    });
  }

  getSinglePost(id: string): Observable<DetailQuestion> {
    return this.http.get<ArchiveQuestionResponse>(`${environment.dbUrl}/questions/${id}`, {
      params: {
        site: environment.siteDomain,
        key: environment.key,
        filter: environment.detailFilter
      }
    }).pipe(
      map((response: ArchiveQuestionResponse) => {
        return <DetailQuestion>response.items[0]
      })
    );
  }

  getPostsByAuthor(user: User, pagesize: number): Observable<ArchiveQuestionResponseByAuthor> {
    return this.http.get<ArchiveQuestionResponse>(`${environment.dbUrl}/users/${user.user_id}/questions`, {
      params: {
        pagesize,
        site: environment.siteDomain,
        key: environment.key,
        filter: environment.archiveFilter,
        order: 'desc',
        sort: 'votes'
      }
    }).pipe(
      map(response => ({ ...response, owner: user }))
    );
  }
}
