import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  getSysTypeCode(baseUrl: string): Observable<any> {
    return this.postHttpClient(baseUrl);
  }

  getMappingCodeList(baseUrl: string, pageIndex: number, pageSize: number, sysType: String): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&CODE_TYPE=${sysType}`;
    return this.postHttpClient(targetUrl);
  }

  addOrEditSystemCodeSet(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('CODE_TYPE', data.code_TYPE);
    formdata.append('CODE_NO', data.code_NO);
    formdata.append('CODE_DESC', data.code_DESC);
    formdata.append('CODE_SORT', data.code_SORT);
    formdata.append('CODE_TAG', data.code_TAG);
    formdata.append('CODE_FLAG', data.code_FLAG);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

}
