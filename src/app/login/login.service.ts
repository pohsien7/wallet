import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(protected httpClient: HttpClient) { super(); }

  private async checkEmpNoPromise(empNo: String) {
    const getURL = 'http://localhost:8080/checkId?empNo=' + empNo;
    return await this.httpClient.get(getURL, this.httpOptions).toPromise();
  }

  public async initData(empNo: String): Promise<boolean> {
    let isOk: boolean = false;
    const data = await this.checkEmpNoPromise(empNo).then((data) => {
      isOk = (JSON.stringify(data) === 'true');
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return isOk;
  }

}
