import { Component, OnInit } from '@angular/core';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  constructor(private menuListService: MenuListService) { }

  ngOnInit(): void {
  }

  getMenu(): Menu[] {
    return this.menuListService.getMap();
  }
}
