import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04004Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getRoleOption(baseUrl: string): Observable<any> {
    return this.postApiFor_NET(baseUrl);
  }

  getRoleFunction(baseUrl: string, roleNo: String): Observable<any> {
    let targetUrl = `${baseUrl}?roleNo=${roleNo}`;
    return this.postApiFor_NET(targetUrl);
  }

  saveRoleFunction(baseUrl: string, formData: FormData): Observable<any> {
    return this.formDataApiFor_NET(baseUrl, formData);
  }
}
