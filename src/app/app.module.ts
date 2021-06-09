import { F01002wopenComponent } from './f01002/f01002wopen/f01002wopen.component';
import { F02007confirmComponent } from './f02007/f02007confirm/f02007confirm.component';
import { F04003confirmComponent } from './f04003/f04003confirm/f04003confirm.component';
import { TestPipe } from './f04002/testPipe';
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
import { F04003Component } from './f04003/f04003.component';
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
import { F04004Component } from './f04004/f04004.component';
import { FormatNumberPipe,ToNumberPipe } from './f03001/customFormatterPipe';
import { DecimalPipe } from '@angular/common';

import { F04003shopComponent } from './f04003/f04003shop/f04003shop.component';
import { F03004Component } from './f03004/f03004.component';
import { F03004confirmComponent } from './f03004/f03004confirm/f03004confirm.component';
import { F03003Component } from './f03003/f03003.component';
import { F03003confirmComponent } from './f03003/f03003confirm/f03003confirm.component';
import { F03004wopenComponent } from './f03004/f03004wopen/f03004wopen.component';
import { F02008Component } from './f02008/f02008.component';
import { F02008confirmComponent } from './f02008/f02008confirm/f02008confirm.component';
import { F02008wopenComponent } from './f02008/f02008wopen/f02008wopen.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02007Component } from './f02007/f02007.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { F03005Component } from './f03005/f03005.component';
import { F03006Component } from './f03006/f03006.component';
import { F03005confirmComponent } from './f03005/f03005confirm/f03005confirm.component';
import { F03006confirmComponent } from './f03006/f03006confirm/f03006confirm.component';
import { F03005wopenComponent } from './f03005/f03005wopen/f03005wopen.component';
import { F03006wopenComponent } from './f03006/f03006wopen/f03006wopen.component';
import { F02009Component } from './f02009/f02009.component';
import { F02010Component } from './f02010/f02010.component';
import { F02009confirmComponent } from './f02009/f02009confirm/f02009confirm.component';
import { F02009wopenComponent } from './f02009/f02009wopen/f02009wopen.component';
import { F02010confirmComponent } from './f02010/f02010confirm/f02010confirm.component';
import { F02010wopenComponent } from './f02010/f02010wopen/f02010wopen.component';
import { F03001wopenComponent } from './f03001/f03001wopen/f03001wopen.component';
import { F03002wopenComponent } from './f03002/f03002wopen/f03002wopen.component';
import { F05001confirmComponent } from './f05001/f05001confirm/f05001confirm.component';
import { F05002confirmComponent } from './f05002/f05002confirm/f05002confirm.component';
import { F03007Component } from './f03007/f03007.component';
import { F03007confirmComponent } from './f03007/f03007confirm/f03007confirm.component';
import { F03007wopenComponent } from './f03007/f03007wopen/f03007wopen.component';
import { F03008Component } from './f03008/f03008.component';
import { F03009Component } from './f03009/f03009.component';
import { F03008confirmComponent } from './f03008/f03008confirm/f03008confirm.component';
import { F03009confirmComponent } from './f03009/f03009confirm/f03009confirm.component';
import { F03008wopenComponent } from './f03008/f03008wopen/f03008wopen.component';
import { F03009wopenComponent } from './f03009/f03009wopen/f03009wopen.component';
import { F01001wopenComponent } from './f01001/f01001wopen/f01001wopen.component';
import { F01001confirmComponent } from './f01001/f01001confirm/f01001confirm.component';
import { F03010Component } from './f03010/f03010.component';
import { F03011Component } from './f03011/f03011.component';
import { F03010confirmComponent } from './f03010/f03010confirm/f03010confirm.component';
import { F03010wopenComponent } from './f03010/f03010wopen/f03010wopen.component';
import { F03011confirmComponent } from './f03011/f03011confirm/f03011confirm.component';
import { F03011wopenComponent } from './f03011/f03011wopen/f03011wopen.component';
import { F03003wopenComponent } from './f03003/f03003wopen/f03003wopen.component';
import { F05001wopenComponent } from './f05001/f05001wopen/f05001wopen.component';
import { F05002wopenComponent } from './f05002/f05002wopen/f05002wopen.component';
import { F01002confirmComponent } from './f01002/f01002confirm/f01002confirm.component';
import { F02011Component } from './f02011/f02011.component';
import { F02011wopenComponent } from './f02011/f02011wopen/f02011wopen.component';
import { F02011confirmComponent } from './f02011/f02011confirm/f02011confirm.component';
import { F03012Component } from './f03012/f03012.component';
import { F03012confirmComponent } from './f03012/f03012confirm/f03012confirm.component';
import { F03012wopenComponent } from './f03012/f03012wopen/f03012wopen.component';
import { F02012Component } from './f02012/f02012.component';
import { F02012confirmComponent } from './f02012/f02012confirm/f02012confirm.component';
import { F02012wopenComponent } from './f02012/f02012wopen/f02012wopen.component';
import { F03013Component } from './f03013/f03013.component';
import { F03013wopenComponent } from './f03013/f03013wopen/f03013wopen.component';
import { F03013confirmComponent } from './f03013/f03013confirm/f03013confirm.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { F02014wopenComponent } from './f02014/f02014wopen/f02014wopen.component';
import { F02014confirmComponent } from './f02014/f02014confirm/f02014confirm.component';
import { F02014Component } from './f02014/f02014.component';
import { F02013wopenComponent } from './f02013/f02013wopen/f02013wopen.component';
import { F02013confirmComponent } from './f02013/f02013confirm/f02013confirm.component';
import { F02013Component } from './f02013/f02013.component';
import { F02015Component } from './f02015/f02015.component';
import { F02015wopenComponent } from './f02015/f02015wopen/f02015wopen.component';
import { F02015confirmComponent } from './f02015/f02015confirm/f02015confirm.component';
import { F04005Component } from './f04005/f04005.component';
import { F04005confirmComponent } from './f04005/f04005confirm/f04005confirm.component';
import { LoginconfirmComponent } from './login/loginconfirm/loginconfirm.component';
import { BarcodetestComponent } from './barcodetest/barcodetest.component';





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
    F03002confirmComponent,
    F04004Component,
    TestPipe,
    FormatNumberPipe,
    ToNumberPipe,
    F04003shopComponent,
    F04003confirmComponent,
    F03004Component,
    F03004confirmComponent,
    F03003Component,
    F03003confirmComponent,
    F03004wopenComponent,
    F02008Component,
    F02008confirmComponent,
    F02008wopenComponent,
    F02007Component,
    F02007confirmComponent,
    F02008Component,
    QrcodeComponent,
    F03005Component,
    F03006Component,
    F03005confirmComponent,
    F03006confirmComponent,
    F03005wopenComponent,
    F03006wopenComponent,
    F02009Component,
    F02010Component,
    F02009confirmComponent,
    F02009wopenComponent,
    F02010confirmComponent,
    F02010wopenComponent,
    F03001wopenComponent,
    F03002wopenComponent,
    F05001confirmComponent,
    F05002confirmComponent,
    F03007Component,
    F03007confirmComponent,
    F03007wopenComponent,
    F03008Component,
    F03009Component,
    F03008confirmComponent,
    F03009confirmComponent,
    F03008wopenComponent,
    F03009wopenComponent,
    F01001wopenComponent,
    F01001confirmComponent,
    F03010Component,
    F03011Component,
    F03010confirmComponent,
    F03010wopenComponent,
    F03011confirmComponent,
    F03011wopenComponent,
    F03003wopenComponent,
    F05001wopenComponent,
    F05002wopenComponent,
    F01002wopenComponent,
    F01002confirmComponent,
    F02011Component,
    F02011wopenComponent,
    F02011confirmComponent,
    F03012Component,
    F03012confirmComponent,
    F03012wopenComponent,
    F02012Component,
    F02012confirmComponent,
    F02012wopenComponent,
    F03013Component,
    F03013wopenComponent,
    F03013confirmComponent,
    F02013Component,
    F02013confirmComponent,
    F02013wopenComponent,
    F02014Component,
    F02014confirmComponent,
    F02014wopenComponent,
    F02015Component,
    F02015wopenComponent,
    F02015confirmComponent,
    F04005Component,
    F04005confirmComponent,
    LoginconfirmComponent,
    BarcodetestComponent
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
    NgxMatDatetimePickerModule,
    NgxMatMomentModule
  ],
  providers: [
    BnNgIdleService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {}},
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
