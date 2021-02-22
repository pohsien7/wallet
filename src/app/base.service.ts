import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient: HttpClient) { }

  //private httpOptions = {
    //headers: new HttpHeaders({
      //'Access-Control-Allow-Origin': environment.allowOrigin,
      //'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      //'Access-Control-Max-Age': '86400'
    //})
  //};

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':  'http://192.168.0.62:9082',
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

  protected getRuleEngine(baseUrl: string) {
    let formData = new FormData();
    formData.append('value', 'BUS_TYPE');
    return this.httpClient.post<any>(baseUrl, formData, this.httpOptions);
  }

  protected testHttpClient() {
    const baseUrl = 'http://192.168.0.62:9082/RuleCode/GetRuleCode?value=BUS_TYPE';
    return this.httpClient.post<any>(baseUrl, this.httpOptions);
  }
}
