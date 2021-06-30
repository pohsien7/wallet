import { BaseService } from './../base.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class F02022Service extends BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }

}
