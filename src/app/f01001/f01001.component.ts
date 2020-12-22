import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-f01001',
  templateUrl: './f01001.component.html',
  styleUrls: ['./f01001.component.css']
})
export class F01001Component implements AfterViewInit  {
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;

  currentSort: Sort;

  emailsDataSource = new MatTableDataSource<any>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  ngAfterViewInit() {

    // this.paginator.lastPage = () => this.yourMethodToTrigger();

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.getIssuees();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getIssuees();
    });
  }

  yourMethodToTrigger() {
    console.log('Triggered!');
    console.log(this.totalCount);
    console.log(this.currentPage.pageIndex);
    console.log(this.currentPage.pageIndex + 1);
    console.log(this.currentPage.pageSize);
  }

  changeSort(sortInfo: Sort) {
    // 因為API排序欄位是created，因此在這邊做調整
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
    this.getIssuees();
  }

  getIssuees() {
    const baseUrl = 'https://api.github.com/search/issues?q=repo:angular/components';
    let targetUrl = `${baseUrl}&page=${this.currentPage.pageIndex + 1}&per_page=${this.currentPage.pageSize}`;
    if (this.currentSort.direction) {
      targetUrl = `${targetUrl}&&sort=${this.currentSort.active}&order=${this.currentSort.direction}`;
    }
    this.httpClient
      .get<any>(targetUrl)
      .subscribe(data => {
        this.totalCount = 1000;
        this.emailsDataSource.data = data.items;
        // 從後端進行排序時，不用指定sort
        // this.emailsDataSource.sort = this.sortTable;
        // 從後端取得資料時，就不用指定data srouce的paginator了
        // this.emailsDataSource.paginator = this.paginator;
      });
  }

  getLockCase(param: String) {
    console.log('1.' + param);
    // CALL API 鎖定流程上的案件並取得案件資料
    this.router.navigate(['./F01001SCN1'], { queryParams: { applno: param } });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.emailsDataSource.filter = filterValue;
  }

}
