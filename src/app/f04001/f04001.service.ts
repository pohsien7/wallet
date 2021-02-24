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
    const baseUrl = 'SystemCodeSet/Option';
    return this.postHttpClient(baseUrl);
  }

  getMappingCode(pageIndex: number, pageSize: number, sysType: String): Observable<any> {
    const baseUrl = 'SystemCodeSet/Search';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&CODE_TYPE=${sysType}`;
    return this.postHttpClient(targetUrl);
  }

  private async saveOrEditMappingCode(datas: any, baseUrl: string) {
    const formdata: FormData = new FormData();
    formdata.append('CODE_TYPE', datas.code_TYPE);
    formdata.append('CODE_NO', datas.code_NO);
    formdata.append('CODE_DESC', datas.code_DESC);
    formdata.append('CODE_SORT', datas.code_SORT);
    formdata.append('CODE_TAG', datas.code_TAG);
    formdata.append('CODE_FLAG', datas.code_FLAG);
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  private getMsgStr(rspCode: string, rspMsg: string): string {
    let msgStr: string = "";
    if (rspCode === '0000' && rspMsg === '成功') { msgStr = '儲存成功！'; }
    if (rspCode === '9999' && rspMsg === '失敗') { msgStr = '儲存失敗！'; }
    if (rspCode === '0001' && rspMsg === '資料重複無法新增') { msgStr = '該類別已存在此代碼'; }
    return msgStr;
  }

  public async saveMsgString(datas: any): Promise<string> {
    let rspCode: any;
    let rspMsg: any;
    const baseUrl = 'SystemCodeSet/Add';
    await this.saveOrEditMappingCode(datas, baseUrl).then((data) => {
      rspCode = data.RspCode;
      rspMsg = data.RspMsg;
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });

    return this.getMsgStr(rspCode, rspMsg);
  }

  public async editMsgString(datas: any): Promise<string> {
    let rspCode: any;
    let rspMsg: any;
    const baseUrl = 'SystemCodeSet/Edit';
    await this.saveOrEditMappingCode(datas, baseUrl).then((data) => {
      rspCode = data.RspCode;
      rspMsg = data.RspMsg;
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });

    return this.getMsgStr(rspCode, rspMsg);
  }
}
