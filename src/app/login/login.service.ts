import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  RuleCode: sysCode[] = null;
  Condition: sysCode[] = null;
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  private async checkEmpNoPromise(empNo: String) {
    const baseURL = 'FunctionList?strEmpID=' + empNo;
    return await this.postHttpClient(baseURL).toPromise();
  }

  public async initData(empNo: String): Promise<boolean> {
    let isOk: boolean = false;
    const data = await this.checkEmpNoPromise(empNo).then((data) => {
      isOk = (data.rspCode === '0000' && data.rspMsg === '成功');
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return isOk;
  }
}
