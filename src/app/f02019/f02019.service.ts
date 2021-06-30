import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { WINDOW } from '../window.service';
import { F02019Component } from './f02019.component';

@Injectable({
  providedIn: 'root'
})
export class F02019Service extends BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }

  which: string;
  getWalletIdList(baseUrl: string, jsonString: string): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('value', jsonString);
    return this.postFormData(baseUrl, formdata);
  }

  public async get(checkString: string, ID: string) {
    const baseURL = 'tableList?checkString=' + checkString + '&sendID='+ID;
    return await this.postHttpClient(baseURL).toPromise();
  }
}
