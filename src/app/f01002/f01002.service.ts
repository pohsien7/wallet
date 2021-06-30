import { BaseService } from './../base.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class F01002Service extends BaseService {
  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }
  getWalletIdList(baseUrl: string, jsonString: string): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('value', jsonString);
    return this.postFormData(baseUrl, formdata);
  }
}
