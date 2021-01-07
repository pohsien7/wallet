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
  BusType: sysCode[] = [];
  ParmType: sysCode[] = [];
  ParmDim: sysCode[] = [];
  ParmClass: sysCode[] = [];
  Condition: sysCode[] = [];
  RuleStep: sysCode[] = [];
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  private async checkEmpNoPromise(empNo: String) {
    const getURL = 'checkId?empNo=' + empNo;
    return await this.getHttpClient(getURL).toPromise();
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

  private async getBusTypeOption(): Promise<Observable<any>> {
    const baseUrl = 'getBusTypeOption';
    return await this.postHttpClient(baseUrl).toPromise();
  }

  public async getBusType(): Promise<sysCode[]> {
    await this.getBusTypeOption().then((data: any) => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.BusType.push({value: codeNo, viewValue: desc})
      }
    });
    return this.BusType;
  }

  private async getParmTypeOption(): Promise<Observable<any>> {
    const baseUrl = 'getParmTypeOption';
    return await this.postHttpClient(baseUrl).toPromise();;
  }

  public async getParmType(): Promise<sysCode[]> {
    await this.getParmTypeOption().then((data: any) => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.ParmType.push({value: codeNo, viewValue: desc})
      }
    });
    return this.ParmType;
  }

  private async getParmDimOption(): Promise<Observable<any>> {
    const baseUrl = 'getParmDimOption';
    return await this.postHttpClient(baseUrl).toPromise();;
  }

  public async getParmDim(): Promise<sysCode[]> {
    await this.getParmDimOption().then((data: any) => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.ParmDim.push({value: codeNo, viewValue: desc})
      }
    });
    return this.ParmDim;
  }

  private async getParmClassOption(): Promise<Observable<any>> {
    const baseUrl = 'getParmClassOption';
    return await this.postHttpClient(baseUrl).toPromise();;
  }

  public async getParmClass(): Promise<sysCode[]> {
    await this.getParmClassOption().then((data: any) => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.ParmClass.push({value: codeNo, viewValue: desc})
      }
    });
    return this.ParmClass;
  }

  private async getConditionOption(): Promise<Observable<any>> {
    const baseUrl = 'getConditionOption';
    return await this.postHttpClient(baseUrl).toPromise();
  }

  public async getCondition(): Promise<sysCode[]> {
    await this.getConditionOption().then((data: any) => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.Condition.push({value: codeNo, viewValue: desc})
      }
    });
    return this.Condition;
  }

  private async getRuleStepOption(): Promise<Observable<any>> {
    const baseUrl = 'getRuleStepOption';
    return await this.postHttpClient(baseUrl).toPromise();
  }

  public async getRuleStep(): Promise<sysCode[]> {
    await this.getRuleStepOption().then((data: any) => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.RuleStep.push({value: codeNo, viewValue: desc})
      }
    });
    return this.RuleStep;
  }

}
