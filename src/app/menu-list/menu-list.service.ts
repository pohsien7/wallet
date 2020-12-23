import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { Menu } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuListService extends BaseService {
  private empNo: String = '';
  private menuList: Menu[] = [];

  constructor (private httpClient: HttpClient, private route: ActivatedRoute){
    super();
    this.addMenu();
  }

  public getMenuData(): Observable<any> {
    this.route.queryParams.subscribe(params => {
      console.log('menu====>' + params['empNo']);
      this.empNo = params['empNo'];
    });
    const getURL = 'http://localhost:8080/getMenu?empNo=' + this.empNo;
    return this.httpClient.post<any>(getURL, this.httpOptions);
  }

  addMenu(): void {
    this.getMenuData().subscribe(data => {
      for (const jsonObj of data) {
        const title = jsonObj['title'];                // 功能主標題
        const dataMap = jsonObj['dataMap'];
        const keyArray = Object.keys(dataMap);         // 功能子標題
        const menuMap = new Map<string, string>();
        for (const menu of keyArray) {
          const path = dataMap[menu];                  // 功能/URL
          menuMap.set(menu, path);
        }
        this.menuList.push(new Menu(title.toString(), menuMap));
      }
    });
  }

  getMap(): Menu[] {
    return this.menuList;
  }

}
