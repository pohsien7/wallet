import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(); }
  dialogData: any;

  getSysTypeCode(): Observable<any> {
    const baseUrl = 'http://localhost:8080/getSysTypeCode';
    return this.httpClient.post<any>(baseUrl, this.httpOptions);
  }

  getMappingCode(pageIndex: number, pageSize: number, sysType: String): Observable<any> {
    const baseUrl = 'http://localhost:8080/getMappingCode';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&sys_type=${sysType}`;
    return this.httpClient.post<any>(targetUrl, this.httpOptions);
  }

  updateMappingCode(datas: any) {
    const baseUrl = 'http://localhost:8080/updateMappingCode';
    let targetUrl = `${baseUrl}?code_TYPE=${datas.code_TYPE}&code_NO=${datas.code_NO}&code_DESC=${datas.code_DESC}&code_SORT=${datas.code_SORT}&code_TAG=${datas.code_TAG}&code_FLAG=${datas.code_FLAG}`;
    this.httpClient.post<any>(targetUrl, this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }

}
