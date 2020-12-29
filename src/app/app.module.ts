import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListModule } from './menu-list/menu-list.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { F04001Component } from './f04001/f04001.component';
import { F04002Component } from './f04002/f04002.component';
import { F05001Component } from './f05001/f05001.component';
import { F05002Component } from './f05002/f05002.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { F01001Component } from './f01001/f01001.component';

import { MatTableModule }from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { F01001scn1Component } from './f01001scn1/f01001scn1.component';

import { F01001scn3Component } from './f01001scn3/f01001scn3.component';
import { F01001scn4Component } from './f01001scn4/f01001scn4.component';
import { F01001scn5Component } from './f01001scn5/f01001scn5.component';
import { F01001scn6Component } from './f01001scn6/f01001scn6.component';
import { F01001scn7Component } from './f01001scn7/f01001scn7.component';
import { F01001scn8Component } from './f01001scn8/f01001scn8.component';
import { F01001scn9Component } from './f01001scn9/f01001scn9.component';
import { F01001scn10Component } from './f01001scn10/f01001scn10.component';
import { F01001scn11Component } from './f01001scn11/f01001scn11.component';
import { F01001scn12Component } from './f01001scn12/f01001scn12.component';
import { F01001scn13Component } from './f01001scn13/f01001scn13.component';
import { F01001scn2Component } from './f01001scn2/f01001scn2.component';
import { AddComponent } from './f04001/add/add.component';
import { EditComponent } from './f04001/edit/edit.component';
import { AddConfirmComponent } from './f04001/add/add-confirm/add-confirm.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BnNgIdleService } from 'bn-ng-idle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    F04001Component,
    F04002Component,
    F05001Component,
    F05002Component,
    LoginComponent,
    F01001Component,
    F01001scn1Component,
    F01001scn2Component,
    F01001scn3Component,
    F01001scn4Component,
    F01001scn5Component,
    F01001scn6Component,
    F01001scn7Component,
    F01001scn8Component,
    F01001scn9Component,
    F01001scn10Component,
    F01001scn11Component,
    F01001scn12Component,
    F01001scn13Component,
    AddComponent,
    EditComponent,
    AddConfirmComponent
  ],
  imports: [
    BrowserModule,
    MenuListModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})

export class AppModule { }
