import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F06001Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getRuleParmList(pageIndex: number, pageSize: number, formdata: FormData): Observable<any> {
    const baseUrl = 'RuleParam/Search';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formdata);
  }
}
