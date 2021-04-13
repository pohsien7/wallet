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







  private async getRuleCodeOption(value: string): Promise<Observable<any>> {
    let formData = new FormData();
    formData.append('value', value);
    const baseUrl = 'http://192.168.0.62:9082/RuleCode/GetRuleCode';

    return await this.formDataApiFor_NET(baseUrl, formData).toPromise();
  }

  public async getRuleCode(value: string): Promise<sysCode[]> {
    this.RuleCode = [];
    await this.getRuleCodeOption(value).then((data: any) => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.RuleCode.push({value: codeNo, viewValue: desc});
      }
    });
    return this.RuleCode;
  }

  private async getConditionOption(): Promise<Observable<any>> {
    let formData = new FormData();
    const baseUrl = 'http://192.168.0.62:9082/RuleParamCondition/GetCondition';
    return await this.formDataApiFor_NET(baseUrl, formData).toPromise();
  }

  public async getCondition(): Promise<sysCode[]> {
    this.Condition = [];
    await this.getConditionOption().then((data: any) => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['conditionId'];
        const desc = jsonObj['conditionName'];
        this.Condition.push({value: codeNo, viewValue: desc});
      }
    });
    return this.Condition;
  }
}
