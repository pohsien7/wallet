import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
}
