import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) {}

  private getHostname() : string {
    var protocol = this.window.location.protocol;
    var port = this.window.location.port;
    var hostname = this.window.location.hostname;
    var url =  protocol +'//'+ hostname +':' + (port == '4200' ? '8080': port)+'/Web';

    return  url
  }

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': environment.allowOrigin,
  //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  //     'Access-Control-Max-Age': '86400'
  //   })
  // };

  private getHttpOptions(allowOrigin: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Max-Age': '86400'
      })
    };
    return httpOptions;
  }

  protected postHttpClient(baseUrl: string) {
    let allowOrigin : string = this.getHostname();
    return this.httpClient.post<any>(allowOrigin + '/' + baseUrl, this.getHttpOptions(allowOrigin));
  }

  protected getHttpClient(baseUrl: string) {
    let allowOrigin : string = this.getHostname();
    return this.httpClient.get<any>(allowOrigin + '/' + baseUrl, this.getHttpOptions(allowOrigin));
  }

  protected postFormData(baseUrl: string, formdata: FormData) {
    let allowOrigin : string = this.getHostname();

    return this.httpClient.post<any>(allowOrigin + '/' + baseUrl, formdata, this.getHttpOptions(allowOrigin));
  }

  public getSysTypeCode(codeType: string): Observable<any> {
    const baseUrl = 'getMappingCodeOption';
    let targetUrl = `${baseUrl}?codeType=${codeType}`;
    return this.postHttpClient(targetUrl);
  }

public async sendConsumer(baseUrl: string, formdata: FormData): Promise<any> {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  //================????????????????????????????????????function========================================

  private async saveOrEditWithFormData(baseUrl: string, formdata: FormData) {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  private async getMsgStr(rspCode: string, rspMsg: string): Promise<string> {
    let msgStr: string = "";
    if (rspCode === '0000' && rspMsg === '??????') { msgStr = '???????????????'; }
    if (rspCode === '9999' && rspMsg === '??????') { msgStr = '???????????????'; }
    if (rspCode === '0001' && rspMsg === '????????????????????????') { msgStr = '????????????????????????'; }
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

  //false??????????????? true?????????
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

      // if is not a number (???????????????)
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
