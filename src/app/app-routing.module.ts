import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarcodetestComponent } from './barcodetest/barcodetest.component';
import { NumbertestComponent } from './bnumbertest/numbertest.component';

import { F01001Component } from './f01001/f01001.component';
import { F01002Component } from './f01002/f01002.component';
import { F01003Component } from './f01003/f01003.component';
import { F01004Component } from './f01004/f01004.component';
import { F01005Component } from './f01005/f01005.component';
import { F01006Component } from './f01006/f01006.component';
import { F02001Component } from './f02001/f02001.component';
import { F02002Component } from './f02002/f02002.component';
import { F02003Component } from './f02003/f02003.component';
import { F02004Component } from './f02004/f02004.component';
import { F02005Component } from './f02005/f02005.component';
import { F02006Component } from './f02006/f02006.component';
import { F02007Component } from './f02007/f02007.component';
import { F02008Component } from './f02008/f02008.component';
import { F02009Component } from './f02009/f02009.component';
import { F02010Component } from './f02010/f02010.component';
import { F02011Component } from './f02011/f02011.component';
import { F02012Component } from './f02012/f02012.component';
import { F02013Component } from './f02013/f02013.component';
import { F02014Component } from './f02014/f02014.component';
import { F02015Component } from './f02015/f02015.component';
import { F02016Component } from './f02016/f02016.component';
import { F02017Component } from './f02017/f02017.component';
import { F02018Component } from './f02018/f02018.component';
import { F02019Component } from './f02019/f02019.component';
import { F02020Component } from './f02020/f02020.component';
import { F02021Component } from './f02021/f02021.component';
import { F02022Component } from './f02022/f02022.component';
import { F03001Component } from './f03001/f03001.component';
import { F03002Component } from './f03002/f03002.component';
import { F03003Component } from './f03003/f03003.component';
import { F03004Component } from './f03004/f03004.component';
import { F03005Component } from './f03005/f03005.component';
import { F03006Component } from './f03006/f03006.component';
import { F03007Component } from './f03007/f03007.component';
import { F03008Component } from './f03008/f03008.component';
import { F03009Component } from './f03009/f03009.component';
import { F03010Component } from './f03010/f03010.component';
import { F03011Component } from './f03011/f03011.component';
import { F03012Component } from './f03012/f03012.component';
import { F03013Component } from './f03013/f03013.component';
import { F03014Component } from './f03014/f03014.component';

import { F04001Component } from './f04001/f04001.component';
import { F04002Component } from './f04002/f04002.component';
import { F04003Component } from './f04003/f04003.component';
import { F04004Component } from './f04004/f04004.component';
import { F04005Component } from './f04005/f04005.component';
import { F04006Component } from './f04006/f04006.component';
import { F04007Component } from './f04007/f04007.component';

import { F05001Component } from './f05001/f05001.component';
import { F05002Component } from './f05002/f05002.component';
import { F05003Component } from './f05003/f05003.component';
import { F06001Component } from './f06001/f06001.component';
import { F06002Component } from './f06002/f06002.component';
import { F06003Component } from './f06003/f06003.component';
import { F06004Component } from './f06004/f06004.component';
import { F06005Component } from './f06005/f06005.component';
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

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuListComponent } from './menu-list/menu-list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'barcode',
    component: BarcodetestComponent
  },
  {
    path: 'number',
    component: NumbertestComponent
  },
  {
    path: 'logIn',
    component: LoginComponent
  },
  {
    path: 'logOut',
    component: LoginComponent
  },
  {
    path: '',
    component: MenuListComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'F01001',
        component: F01001Component
      },
      {
        path: 'F01002',
        component: F01002Component
      },
      {
        path: 'F01003',
        component: F01003Component
      },
      {
        path: 'F01004',
        component: F01004Component
      },
      {
        path: 'F01005',
        component: F01005Component
      },
      {
        path: 'F01006',
        component: F01006Component
      },
      {
        path: 'F02001',
        component: F02001Component
      },
      {
        path: 'F02002',
        component: F02002Component
      },
      {
        path: 'F02003',
        component: F02003Component
      },
      {
        path: 'F02004',
        component: F02004Component
      },
      {
        path: 'F02005',
        component: F02005Component
      },
      {
        path: 'F02006',
        component: F02006Component
      },
      {
        path: 'F02007',
        component: F02007Component
      },
      {
        path: 'F02008',
        component: F02008Component
      },
      {
        path: 'F02009',
        component: F02009Component
      },
      {
        path: 'F02010',
        component: F02010Component
      },
      {
        path: 'F02011',
        component: F02011Component
      },
      {
        path: 'F02012',
        component: F02012Component
      },
      {
        path: 'F02013',
        component: F02013Component
      },
      {
        path: 'F02014',
        component: F02014Component
      },
      {
        path: 'F02015',
        component: F02015Component
      },
      {
        path: 'F02016',
        component: F02016Component
      },
      {
        path: 'F02017',
        component: F02017Component
      },
      {
        path: 'F02018',
        component: F02018Component
      },
      {
        path: 'F02019',
        component: F02019Component
      },
      {
        path: 'F02020',
        component: F02020Component
      },
      {
        path: 'F02021',
        component: F02021Component
      },
      {
        path: 'F02022',
        component: F02022Component
      },
      {
        path: 'F03001',
        component: F03001Component
      },
      {
        path: 'F03002',
        component: F03002Component
      },
      {
        path: 'F03003',
        component: F03003Component
      },
      {
        path: 'F03004',
        component: F03004Component
      },
      {
        path: 'F03005',
        component: F03005Component
      },
      {
        path: 'F03006',
        component: F03006Component
      },
      {
        path: 'F03007',
        component: F03007Component
      },
      {
        path: 'F03008',
        component: F03008Component
      },
      {
        path: 'F03009',
        component: F03009Component
      },
      {
        path: 'F03010',
        component: F03010Component
      },
      {
        path: 'F03011',
        component: F03011Component
      },
      {
        path: 'F03012',
        component: F03012Component
      },
      {
        path: 'F03013',
        component: F03013Component
      },
      {
        path: 'F03014',
        component: F03014Component
      },
      {
        path: 'F04001',
        component: F04001Component
      },
      {
        path: 'F04002',
        component: F04002Component
      },
      {
        path: 'F04003',
        component: F04003Component
      },
      {
        path: 'F04003',
        component: F04003Component
      },
      {
        path: 'F04004',
        component: F04004Component
      },
      {
        path: 'F04005',
        component: F04005Component
      },
      {
        path: 'F04006',
        component: F04006Component
      },
      {
        path: 'F04007',
        component: F04007Component
      },
      {
        path: 'F05001',
        component: F05001Component
      },
      {
        path: 'F05002',
        component: F05002Component
      },
      {
        path: 'F05003',
        component: F05003Component
      },
      {
        path: 'F06001',
        component: F06001Component
      },
      {
        path: 'F06002',
        component: F06002Component
      },
      {
        path: 'F06003',
        component: F06003Component
      },
      {
        path: 'F06004',
        component: F06004Component
      },
      {
        path: 'F06005',
        component: F06005Component
      },
      {
        path: 'F06006',
        component: F06006Component
      },
      {
        path: 'F06007',
        component: F06007Component
      },
      {
        path: 'F07001',
        component: F07001Component
      },
      {
        path: 'F07002',
        component: F07002Component
      },
      {
        path: 'F07003',
        component: F07003Component
      },
      {
        path: 'F07004',
        component: F07004Component
      },
      {
        path: 'F07005',
        component: F07005Component
      },
      {
        path: 'F07006',
        component: F07006Component
      },
      {
        path: 'F07007',
        component: F07007Component
      },
      {
        path: 'F07008',
        component: F07008Component
      },
      {
        path: 'F07009',
        component: F07009Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
