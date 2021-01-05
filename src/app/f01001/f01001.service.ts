import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getCaseList(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'getCaseList';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }
}
