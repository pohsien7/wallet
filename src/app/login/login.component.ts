import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  no = '';
  pwd = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async onClickMe(): Promise<void>  {
    if (await this.loginService.initData(this.no)) {
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
    } else {
      alert('帳號有誤!');
    }
  }
}
