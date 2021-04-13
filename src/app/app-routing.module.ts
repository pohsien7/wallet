import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01001Component } from './f01001/f01001.component';
import { F01002Component } from './f01002/f01002.component';
import { F02001Component } from './f02001/f02001.component';
import { F02002Component } from './f02002/f02002.component';
import { F02003Component } from './f02003/f02003.component';
import { F02004Component } from './f02004/f02004.component';
import { F03001Component } from './f03001/f03001.component';
import { F03002Component } from './f03002/f03002.component';

import { F04001Component } from './f04001/f04001.component';
import { F04002Component } from './f04002/f04002.component';
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
        path: 'F03001',
        component: F03001Component
      },
      {
        path: 'F03002',
        component: F03002Component
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
