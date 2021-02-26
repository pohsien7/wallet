import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04002Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  getAdrCodeList(baseUrl: string, pageIndex: number, pageSize: number, adrType: string, adType: string): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&adrType=${adrType}&adType=${adType}`;
    return this.postHttpClient(targetUrl);
  }

  addOrEditAdrCodeSet(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('REASON_KIND', data.reason_KIND);
    formdata.append('AD_TYPE', data.ad_TYPE);
    formdata.append('REASON_CODE', data.reason_CODE);
    formdata.append('REASON_DESC', data.reason_DESC);
    formdata.append('REASON_SORT', data.reason_SORT);
    formdata.append('REASON_FLAG', data.reason_FLAG);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }
}
