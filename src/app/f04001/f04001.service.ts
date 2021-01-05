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

  getSysTypeCode(): Observable<any> {
    const baseUrl = 'getSysTypeCode';
    return this.postHttpClient(baseUrl);
  }

  getMappingCode(pageIndex: number, pageSize: number, sysType: String): Observable<any> {
    const baseUrl = 'getMappingCode';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&sys_type=${sysType}`;
    return this.postHttpClient(targetUrl);
  }

  updateMappingCode(datas: any) {
    const baseUrl = 'updateMappingCode';
    let targetUrl = `${baseUrl}?code_TYPE=${datas.code_TYPE}&code_NO=${datas.code_NO}&code_DESC=${datas.code_DESC}&code_SORT=${datas.code_SORT}&code_TAG=${datas.code_TAG}&code_FLAG=${datas.code_FLAG}`;
    this.postHttpClient(targetUrl).subscribe(data => {
      console.log(data);
    });
  }

  private async checkExistPromise(datas: any) {
    const baseUrl = 'checkMappgingExist';
    let targetUrl = `${baseUrl}?code_TYPE=${datas.code_TYPE}&code_NO=${datas.code_NO}`;
    return await this.postHttpClient(targetUrl).toPromise();
  }

  public async checkMappgingExist(datas: any): Promise<boolean> {
    let isExist: boolean = false;
    const data = await this.checkExistPromise(datas).then((data) => {
      isExist = (JSON.stringify(data) === 'true');
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return isExist;
  }

  insertMappingCode(datas: any) {
    const baseUrl = 'insertMappingCode';
    let targetUrl = `${baseUrl}?code_TYPE=${datas.code_TYPE}&code_NO=${datas.code_NO}&code_DESC=${datas.code_DESC}&code_SORT=${datas.code_SORT}&code_TAG=${datas.code_TAG}&code_FLAG=${datas.code_FLAG}`;
    this.postHttpClient(targetUrl).subscribe(data => {
      console.log(data);
    });
  }

}
