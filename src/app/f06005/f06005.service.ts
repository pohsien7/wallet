import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class F06005Service extends BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }

  getRulePolicy(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'getRulePolicy';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  getRulePolicyFormData(pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    const baseUrl = 'getRulePolicyFormData';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }

}
