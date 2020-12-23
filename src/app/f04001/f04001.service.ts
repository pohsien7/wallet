import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(); }
  getSysTypeCode(): Observable<any> {
    const baseUrl = 'http://localhost:8080/getSysTypeCode';
    return this.httpClient.post<any>(baseUrl, this.httpOptions);
  }

  getMappingCode(pageIndex: number, pageSize: number, sysType: String): Observable<any> {
    const baseUrl = 'http://localhost:8080/getMappingCode';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&sys_type=BRANCH_CODE`;
    return this.httpClient.post<any>(targetUrl, this.httpOptions);
  }
}
