import { CssSettingComponent } from './../css-setting/css-setting.component';
import { QrcodeComponent } from './../qrcode/qrcode.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {
  constructor(private router: Router, private menuListService: MenuListService, public dialog: MatDialog) { }
  getMenu(): Menu[] { return this.menuListService.getMap(); }
  returnZero() { return 0; }
  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['./logOut']).then(() => {
      window.location.reload();
    });
  }

  setting() {
    this.dialog.open( CssSettingComponent );
  }

  qrcode(){
    this.dialog.open( QrcodeComponent );
  }
}
