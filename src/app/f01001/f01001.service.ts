import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F01001Service {

  constructor(private httpClient: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400',
      responseType: 'boolean'
    })
  };

  getCaseList(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'http://localhost:8080/getCaseList';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.httpClient.post<any>(targetUrl, this.httpOptions);
  }
}
