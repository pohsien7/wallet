import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04003Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  public getGroupCode(): Observable<any> {
    const baseUrl = 'EmployeeSet/gmOption';
    return this.postHttpClient(baseUrl);
  }

  getEmployeeList(pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    const baseUrl = 'EmployeeSet/search';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }
}
