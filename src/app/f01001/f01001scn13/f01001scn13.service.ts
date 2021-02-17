import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';


@Injectable({
  providedIn: 'root'
})
export class F01001scn13Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getWebInfo(): Observable<any> {
    const baseUrl = 'getWebInfo';
    return this.postHttpClient(baseUrl);
  }

  uploadFileToCE(formdata: FormData): Observable<any> {
    const baseUrl = 'uploadFileToCE';
    return this.postFormData(baseUrl, formdata);
  }
}
