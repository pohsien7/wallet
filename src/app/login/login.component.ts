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
    if (await this.loginService.initData(this.no)) {
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
      this.bnIdle.startWatching(60*30).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) { this.routerGoUrl(); }
      });
      sessionStorage.setItem('BusType', JSON.stringify(await this.loginService.getBusType()));
      sessionStorage.setItem('ParmType', JSON.stringify(await this.loginService.getParmType()));
      sessionStorage.setItem('ParmDim', JSON.stringify(await this.loginService.getParmDim()));
      sessionStorage.setItem('ParmClass', JSON.stringify(await this.loginService.getParmClass()));
      sessionStorage.setItem('Condition', JSON.stringify(await this.loginService.getCondition()));
      sessionStorage.setItem('RuleStep', JSON.stringify(await this.loginService.getRuleStep()));
      sessionStorage.setItem('PolicyId', JSON.stringify(await this.loginService.getPolicyId()));
      this.loginService.test();
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
