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
    return this.postHttpClient(baseUrl);
  }

  getRoleFunction(baseUrl: string, roleNo: String): Observable<any> {
    let targetUrl = `${baseUrl}?roleNo=${roleNo}`;
    return this.postHttpClient(targetUrl);
  }

  saveRoleFunction(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
