import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class F06002Service extends BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }

  getRuleParmOption(): Observable<any> {
    const baseUrl = 'getRuleParmOption';
    return this.postHttpClient(baseUrl);
  }

  getRuleParmList(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'getRuleParmList';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  getRuleParmWhereClass(typeClass: string): Observable<any> {
    const baseUrl = 'getRuleParmWhereClass';
    let targetUrl = `${baseUrl}?typeClass=${typeClass}`;
    return this.postHttpClient(targetUrl);
  }
}
