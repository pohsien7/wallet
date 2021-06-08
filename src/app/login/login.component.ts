import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BnNgIdleService } from 'bn-ng-idle';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  no = '';
  pwd = '';
  private bnIdle: BnNgIdleService = null;
  constructor(private router: Router, private loginService: LoginService) { }

  async onClickMe(): Promise<void>  {
    this.bnIdle = new BnNgIdleService();
    if (await this.loginService.initData(this.no, this.pwd)) {
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
      this.bnIdle.startWatching(60*30).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) { this.routerGoUrl(); }
      });
    } else {
      alert('帳號有誤!');
    }
  }

  private routerGoUrl(): void {
    this.bnIdle.stopTimer();
    this.router.navigate(['./logOut']);
    alert('閒置過久已登出');

  }
}
