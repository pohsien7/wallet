import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F06003Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getRuleParmWhereBusType(busType: string): Observable<any> {
    const baseUrl = 'getRuleParmWhereBusType';
    let targetUrl = `${baseUrl}?busType=${busType}`;
    return this.postHttpClient(targetUrl);
  }

  getRuleParmStep(pageIndex: number, pageSize: number): Observable<any> {
    const baseUrl = 'getRuleParmStep';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  getRuleStepWithParm(pageIndex: number, pageSize: number, bustype: string, rulestep: string, parmid: string): Observable<any> {
    const baseUrl = 'getRuleParmStep2';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&bustype=${bustype}&rulestep=${rulestep}&parmid=${parmid}`;
    return this.postHttpClient(targetUrl);
  }
}
