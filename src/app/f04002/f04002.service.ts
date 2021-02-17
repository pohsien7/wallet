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

  getSysTypeCode(codeType: string): Observable<any> {
    const baseUrl = 'getMappingCodeOption';
    let targetUrl = `${baseUrl}?codeType=${codeType}`;
    return this.postHttpClient(targetUrl);
  }

  getAdrCode(pageIndex: number, pageSize: number, adrType: string, adType: string): Observable<any> {
    const baseUrl = 'getAdrCode';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&adrType=${adrType}&adType=${adType}`;
    return this.postHttpClient(targetUrl);
  }





  updateAdrCode(datas: any) {
    const baseUrl = 'updateAdrCode';
    let targetUrl = `${baseUrl}?reason_KIND=${datas.reason_KIND}&ad_TYPE=${datas.ad_TYPE}&reason_CODE=${datas.reason_CODE}&reason_DESC=${datas.reason_DESC}&reason_SORT=${datas.reason_SORT}&reason_FLAG=${datas.reason_FLAG}`;
    this.postHttpClient(targetUrl).subscribe(data => {
      console.log(data);
    });
  }

  private async checkExistPromise(datas: any) {
    const baseUrl = 'checkAdrCodeExist';
    let targetUrl = `${baseUrl}?reason_KIND=${datas.reason_KIND}&ad_TYPE=${datas.ad_TYPE}&reason_CODE=${datas.reason_CODE}`;
    return await this.postHttpClient(targetUrl).toPromise();
  }

  public async checkAdrCodeExist(datas: any): Promise<boolean> {
    let isExist: boolean = false;
    const data = await this.checkExistPromise(datas).then((data) => {
      isExist = (JSON.stringify(data) === 'true');
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return isExist;
  }

  insertAdrCode(datas: any) {
    const baseUrl = 'insertAdrCode';
    let targetUrl = `${baseUrl}?reason_KIND=${datas.reason_KIND}&ad_TYPE=${datas.ad_TYPE}&reason_CODE=${datas.reason_CODE}&reason_DESC=${datas.reason_DESC}&reason_SORT=${datas.reason_SORT}&reason_FLAG=${datas.reason_FLAG}`;
    this.postHttpClient(targetUrl).subscribe(data => {
      console.log(data);
    });
  }
}
