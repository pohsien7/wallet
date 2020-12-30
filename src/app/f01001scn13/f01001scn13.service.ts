import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001scn13Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(); }
  getWebInfo(): Observable<any> {
    const baseUrl = 'http://localhost:8080/getWebInfo';
    return this.httpClient.post<any>(baseUrl, this.httpOptions);
  }
}
