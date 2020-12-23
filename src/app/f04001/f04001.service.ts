import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(); }
  getCaseList(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'http://localhost:8080/getCaseList';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.httpClient.post<any>(targetUrl, this.httpOptions);
  }
}
