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

  private async checkEmpNoPromise(empNo: string, empPwd: string) {
    const formdata: FormData = new FormData();
    formdata.append('strEmpID', empNo);
    formdata.append('strEmpPD', empPwd);
    const baseURL = 'LoginCheck';
    return await this.postFormData(baseURL, formdata).toPromise();
  }

  public async initData(empNo: string, empPwd: string): Promise<boolean> {
    let isOk: boolean = false;
    const data = await this.checkEmpNoPromise(empNo, empPwd).then((data) => {
      isOk = (data.rspCode === '0000' && data.rspMsg === '登入成功');
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return isOk;
  }
}
