import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
}

