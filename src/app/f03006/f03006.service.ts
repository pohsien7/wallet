import { BaseService } from './../base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F03006Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getWalletIdList(baseUrl: string, jsonString: string): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('value', jsonString);
    return this.postFormData(baseUrl, formdata);
  }
}
