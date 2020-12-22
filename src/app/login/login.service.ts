import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400',
      responseType: 'boolean'
    })
  };

  private async checkEmpNoPromise(empNo: String) {
    const getURL = 'http://localhost:8080/checkId?empNo=' + empNo;
    return await this.http.get(getURL, this.httpOptions).toPromise();
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
