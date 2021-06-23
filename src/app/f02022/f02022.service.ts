import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class F02022Service extends BaseService{

  constructor(protected httpClient: HttpClient) { super(httpClient); }

}
