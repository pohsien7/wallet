import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': environment.allowOrigin,
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    })
  };

  protected postHttpClient(baseUrl: string) {
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, this.httpOptions);
  }

  protected getHttpClient(baseUrl: string) {
    return this.httpClient.get<any>(environment.allowOrigin + '/' + baseUrl, this.httpOptions);
  }

  protected postFormData(baseUrl: string, formdata: FormData) {
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, formdata, this.httpOptions);
  }

  public getSysTypeCode(codeType: string): Observable<any> {
    const baseUrl = 'getMappingCodeOption';
    let targetUrl = `${baseUrl}?codeType=${codeType}`;
    return this.postHttpClient(targetUrl);
  }

  public async sendConsumer(baseUrl: string, formdata: FormData): Promise<any> {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  //================下方是提供新增或編輯用的function========================================

  private async saveOrEditWithFormData(baseUrl: string, formdata: FormData) {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  private async getMsgStr(rspCode: string, rspMsg: string): Promise<string> {
    let msgStr: string = "";
    if (rspCode === '0000' && rspMsg === '成功') { msgStr = '儲存成功！'; }
    if (rspCode === '9999' && rspMsg === '失敗') { msgStr = '儲存失敗！'; }
    if (rspCode === '0001' && rspMsg === '資料重複無法新增') { msgStr = '資料重複無法新增'; }
    return msgStr;
  }

  public async saveOrEditMsgString(baseUrl: string, formdata: FormData): Promise<string> {
    let rspCode: any;
    let rspMsg: any;
    await this.saveOrEditWithFormData(baseUrl, formdata).then((data) => {
      rspCode = data.rspCode;
      rspMsg = data.rspMsg;
    })
      .catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });
    return await this.getMsgStr(rspCode, rspMsg);
  }

  //false為驗證成功 true為失敗
  public checkIdNumberIsValid(id: string): boolean {
    const regex: RegExp = /^[A-Z][1,2]\d{8}$/
    if (!regex.test(id)) {
      return true;
    } else {
      const idArray: string[] = id.split('')
      const intRadix = 10
      const TAIWAN_ID_LOCALE_CODE_LIST = [
        1, 10, 19, 28, 37, 46, 55, 64, 39, 73,
        82, 2, 11, 20, 48, 29, 38, 47, 56, 65,
        74, 83, 21, 3, 12, 30
      ]

      const RESIDENT_CERTIFICATE_NUMBER_LIST = [
        '0', '1', '2', '3', '4', '5', '6', '7', '4', '8',
        '9', '0', '1', '2', '5', '3', '4', '5', '6', '7',
        '8', '9', '2', '0', '1', '3'
      ]

      // if is not a number (居留證編號)
      if (isNaN(parseInt(idArray[1], intRadix))) {
        idArray[1] =
          RESIDENT_CERTIFICATE_NUMBER_LIST[id.charCodeAt(1) - 'A'.charCodeAt(0)]
      }

      const result = idArray.reduce(
        (sum: number, n: string, index: number): number => {
          if (index === 0) {
            return (
              sum +
              TAIWAN_ID_LOCALE_CODE_LIST[
              idArray[0].charCodeAt(0) - 'A'.charCodeAt(0)
              ]
            )
          } else if (index === 9) {
            return sum + parseInt(idArray[9], intRadix)
          }
          return sum + parseInt(idArray[index], intRadix) * (9 - index)
        },
        0
      )

      if (result % 10 === 0) {
        return false
      }
      return true
    }
  }

  public checkBanIsValid(ban: string): boolean {
    const GUI_NUMBER_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1]
    const n = ban.toString()
    const regex: RegExp = /^\d{8}$/

    if (!regex.test(n)) {
      return true;
    } else {
      const checksum = GUI_NUMBER_COEFFICIENTS.reduce((sum, c, index) => {
        const product = c * parseInt(n.charAt(index), 10)
        return sum + (product % 10) + Math.floor(product / 10)
      }, 0)

      if (
        checksum % 10 === 0 ||
        (parseInt(n.charAt(6), 10) === 7 && (checksum + 1) % 10 === 0)
      ) {
        return false
      }
      return true
    }
  }
}
