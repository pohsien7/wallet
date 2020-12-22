import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [MenuListComponent],
  exports: [MenuListComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class MenuListModule { }
