import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04004Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getRoleOption(): Observable<any> {
    const baseUrl = 'FunctionRoleSet/option';
    return this.postHttpClient(baseUrl);
  }

  getRoleFunction(roleNo: String): Observable<any> {
    const baseUrl = 'FunctionRoleSet/search';
    let targetUrl = `${baseUrl}?roleNo=${roleNo}`;
    return this.postHttpClient(targetUrl);
  }

  saveRoleFunction(formData: FormData): Observable<any> {
    const baseUrl = 'FunctionRoleSet/save';
    return this.postFormData(baseUrl, formData);
  }
}
