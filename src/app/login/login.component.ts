import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatDialog } from '@angular/material/dialog';
import { LoginconfirmComponent } from './loginconfirm/loginconfirm.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  no = '';
  pwd = '';
  private bnIdle: BnNgIdleService = null;
  constructor(private router: Router, private loginService: LoginService, public dialog: MatDialog) { }

  async onClickMe(): Promise<void>  {
    this.bnIdle = new BnNgIdleService();
    if (await this.loginService.initData(this.no, btoa(this.pwd))) {
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
      this.bnIdle.startWatching(60*30).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) { this.routerGoUrl(); }
      });
      sessionStorage.setItem('cvcCode', JSON.stringify(await this.loginService.getCvcCode()));
    } else {
      this.dialog.open(LoginconfirmComponent, { data: { msgStr: '員工編號或密碼有誤' } });
    }
  }

  private routerGoUrl(): void {
    this.bnIdle.stopTimer();
    this.router.navigate(['./logOut']);
    alert('閒置過久已登出');
  }

  public goBarcode() {
    this.router.navigate(['./barcode']);
  }

  public goNumber() {
    this.router.navigate(['./number']);
  }
}
