import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class F01005Service extends BaseService {

  constructor(protected httpClient: HttpClient, @Inject(WINDOW) protected window: Window) { super(httpClient, window); }
}
