import { F04003Component } from './f04003/f04003.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListModule } from './menu-list/menu-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BlockUIModule } from 'ng-block-ui';

import { F04001Component } from './f04001/f04001.component';
import { F04002Component } from './f04002/f04002.component';
import { F05001Component } from './f05001/f05001.component';
import { F05002Component } from './f05002/f05002.component';

import { F01001Component } from './f01001/f01001.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BnNgIdleService } from 'bn-ng-idle';

import { F06001Component } from './f06001/f06001.component';
import { F06002Component } from './f06002/f06002.component';
import { F06003Component } from './f06003/f06003.component';
import { F06004Component } from './f06004/f06004.component';
import { F06005Component } from './f06005/f06005.component';
import { F06001addComponent } from './f06001/f06001add/f06001add.component';
import { F06001editComponent } from './f06001/f06001edit/f06001edit.component';
import { F06001deleteComponent } from './f06001/f06001delete/f06001delete.component';
import { F06002addComponent } from './f06002/f06002add/f06002add.component';
import { F06002editComponent } from './f06002/f06002edit/f06002edit.component';
import { F06002deleteComponent } from './f06002/f06002delete/f06002delete.component';

import { F06003addComponent } from './f06003/f06003add/f06003add.component';
import { F06003editComponent } from './f06003/f06003edit/f06003edit.component';
import { F06003deleteComponent } from './f06003/f06003delete/f06003delete.component';
import { F06004addComponent } from './f06004/f06004add/f06004add.component';
import { F06004editComponent } from './f06004/f06004edit/f06004edit.component';
import { F06004deleteComponent } from './f06004/f06004delete/f06004delete.component';

import { MaterialModule } from './material/material.module';
import { F04001confirmComponent } from './f04001/f04001confirm/f04001confirm.component';
import { F04002confirmComponent } from './f04002/f04002confirm/f04002confirm.component';
import { F01002Component } from './f01002/f01002.component';
import { F02001Component } from './f02001/f02001.component';
import { F02002Component } from './f02002/f02002.component';
import { F03001Component } from './f03001/f03001.component';
import { F03002Component } from './f03002/f03002.component';
import { F05003Component } from './f05003/f05003.component';
import { F06006Component } from './f06006/f06006.component';
import { F06007Component } from './f06007/f06007.component';
import { F07001Component } from './f07001/f07001.component';
import { F07002Component } from './f07002/f07002.component';
import { F07003Component } from './f07003/f07003.component';
import { F07004Component } from './f07004/f07004.component';
import { F07005Component } from './f07005/f07005.component';
import { F07006Component } from './f07006/f07006.component';
import { F07007Component } from './f07007/f07007.component';
import { F07008Component } from './f07008/f07008.component';
import { F07009Component } from './f07009/f07009.component';
import { F02003Component } from './f02003/f02003.component';
import { F02004Component } from './f02004/f02004.component';
import { F02001confirmComponent } from './f02001/f02001confirm/f02001confirm.component';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { F02005Component } from './f02005/f02005.component';
import { F02006Component } from './f02006/f02006.component';
import { F02005confirmComponent } from './f02005/f02005confirm/f02005confirm.component';
import { F02005wopenComponent } from './f02005/f02005wopen/f02005wopen.component';
import { F02006confirmComponent } from './f02006/f02006confirm/f02006confirm.component';
import { F02006wopenComponent } from './f02006/f02006wopen/f02006wopen.component';
import { CssSettingComponent } from './css-setting/css-setting.component';
import { F03001confirmComponent } from './f03001/f03001confirm/f03001confirm.component';
import { F03002confirmComponent } from './f03002/f03002confirm/f03002confirm.component';
import { DatePipe } from '@angular/common';


export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD'
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM'
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    F04001Component,
    F04002Component,
    F04003Component,
    F05001Component,
    F05002Component,
    LoginComponent,
    F01001Component,
    F06001Component,
    F06002Component,
    F06003Component,
    F06004Component,
    F06005Component,
    F06001addComponent,
    F06001editComponent,
    F06001deleteComponent,
    F06002addComponent,
    F06002editComponent,
    F06002deleteComponent,
    F06003addComponent,
    F06003editComponent,
    F06003deleteComponent,
    F06004addComponent,
    F06004editComponent,
    F06004deleteComponent,
    F04001confirmComponent,
    F04002confirmComponent,
    F01002Component,
    F02001Component,
    F02002Component,
    F03001Component,
    F03002Component,
    F05003Component,
    F06006Component,
    F06007Component,
    F07001Component,
    F07002Component,
    F07003Component,
    F07004Component,
    F07005Component,
    F07006Component,
    F07007Component,
    F07008Component,
    F07009Component,
    F02003Component,
    F02004Component,
    F02001confirmComponent,
    F02005Component,
    F02006Component,
    F02005confirmComponent,
    F02005wopenComponent,
    F02006confirmComponent,
    F02006wopenComponent,
    F03001confirmComponent,
    CssSettingComponent,
    F03002confirmComponent
  ],
  imports: [
    BrowserModule,
    MenuListModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    BlockUIModule.forRoot(),
  ],
  providers: [
    BnNgIdleService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
