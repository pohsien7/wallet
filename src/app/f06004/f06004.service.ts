import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class F06004Service extends BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }

  getRuleStep2Col(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'getRuleStep2Col';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  getRuleStep2ColFormData(pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    const baseUrl = 'getRuleStep2ColFormData';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }
}
