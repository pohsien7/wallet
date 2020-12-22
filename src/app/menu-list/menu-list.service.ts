import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  private empNo: String = '';
  private menuList: Menu[] = [];
  private jsonExample = [
    {
      徵審功能: [
        { 案件清單: '/F01001' }
      ]
    },
    {
      維護功能: [
        { 組織人員維護: '/F04001' },
        { 系統代碼維護: '/F04002' }
      ]
    },
    {
      管理功能: [
        { 解除鎖定案件: '/F05001' },
        { 案件轉件處理: '/F05002' }
      ]
    }
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { this.addMenu(); }

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    })
  };

  public getMenuData(): Observable<any> {
    this.route.queryParams.subscribe(params => {
      console.log('menu====>' + params['empNo']);
      this.empNo = params['empNo'];
    });
    const getURL = 'http://localhost:8080/getMenu?empNo=' + this.empNo;
    return this.http.post<any>(getURL, this.httpOptions);
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

    // 根據寫死的jsonExample 長出menu
    // for (const jsonObj of this.jsonExample) {
    //   const title = Object.keys(jsonObj)[0];                // 功能主標題
    //   const valArray = jsonObj[title];

    //   const menuMap = new Map<string, string>();
    //   for (const menu of valArray) {
    //     const key = Object.keys(menu)[0];                   // 功能子標題
    //     const val = menu[key];                              // 功能/URL
    //     menuMap.set(key.toString(), val.toString());
    //   }
    //   this.menuList.push(new Menu(title.toString(), menuMap));
    // }
  }


  getMap(): Menu[] {
    return this.menuList;
  }


}
