import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01001Component } from './f01001/f01001.component';
import { F01001scn1Component } from './f01001scn1/f01001scn1.component';
import { F01001scn10Component } from './f01001scn10/f01001scn10.component';
import { F01001scn11Component } from './f01001scn11/f01001scn11.component';
import { F01001scn12Component } from './f01001scn12/f01001scn12.component';
import { F01001scn13Component } from './f01001scn13/f01001scn13.component';
import { F01001scn2Component } from './f01001scn2/f01001scn2.component';
import { F01001scn3Component } from './f01001scn3/f01001scn3.component';
import { F01001scn4Component } from './f01001scn4/f01001scn4.component';
import { F01001scn5Component } from './f01001scn5/f01001scn5.component';
import { F01001scn6Component } from './f01001scn6/f01001scn6.component';
import { F01001scn7Component } from './f01001scn7/f01001scn7.component';
import { F01001scn8Component } from './f01001scn8/f01001scn8.component';
import { F01001scn9Component } from './f01001scn9/f01001scn9.component';
import { F04001Component } from './f04001/f04001.component';
import { F04002Component } from './f04002/f04002.component';
import { F05001Component } from './f05001/f05001.component';
import { F05002Component } from './f05002/f05002.component';
import { F06001Component } from './f06001/f06001.component';
import { F06002Component } from './f06002/f06002.component';
import { F06003Component } from './f06003/f06003.component';
import { F06004Component } from './f06004/f06004.component';
import { F06005Component } from './f06005/f06005.component';
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
        path: 'F01001SCN1',
        component: F01001scn1Component,
        children: [
          {
            path: 'F01001SCN2',
            component: F01001scn2Component
          },
          {
            path: 'F01001SCN3',
            component: F01001scn3Component
          },
          {
            path: 'F01001SCN4',
            component: F01001scn4Component
          },
          {
            path: 'F01001SCN5',
            component: F01001scn5Component
          },
          {
            path: 'F01001SCN6',
            component: F01001scn6Component
          },
          {
            path: 'F01001SCN7',
            component: F01001scn7Component
          },
          {
            path: 'F01001SCN8',
            component: F01001scn8Component
          },
          {
            path: 'F01001SCN9',
            component: F01001scn9Component
          },
          {
            path: 'F01001SCN10',
            component: F01001scn10Component
          },
          {
            path: 'F01001SCN11',
            component: F01001scn11Component
          },
          {
            path: 'F01001SCN12',
            component: F01001scn12Component
          },
          {
            path: 'F01001SCN13',
            component: F01001scn13Component
          }
        ]
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
