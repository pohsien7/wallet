import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './f04001add/add.component';
import { EditComponent } from './f04001edit/edit.component';
import { F04001Service } from './f04001.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04001',
  templateUrl: './f04001.component.html',
  styleUrls: ['./f04001.component.css']
})
export class F04001Component implements OnInit, AfterViewInit {
  sysCode: sysCode[] = [];
  selectedValue: string;
  constructor(private f04001Service: F04001Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    const baseUrl = 'SystemCodeSet/Option';
    this.f04001Service.getSysTypeCode(baseUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.sysCode.push({value: codeNo, viewValue: desc})
      }
    });
  }
//============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  mappingCodeSource = new MatTableDataSource<any>();
  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getMappingCode();
    });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getMappingCode();
  }

  getMappingCode() {
    const baseUrl = 'SystemCodeSet/Search';
    this.f04001Service.getMappingCodeList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, this.selectedValue)
    .subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.mappingCodeSource.data = data.rspBody.items;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.mappingCodeSource.filter = filterValue.trim().toLowerCase();
  }

  changeSelect() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getMappingCode();
  }

  addNew() {
    if (this.selectedValue == null) {
      alert('請選擇：代碼類別');
    } else {
      const dialogRef = this.dialog.open(AddComponent, {
        data: {
                code_TYPE: this.selectedValue,
                code_NO : '' , code_DESC: '',
                code_SORT: '', code_TAG: '',
                code_FLAG: 'N'
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
    }
  }

  startEdit(i: number,
    code_TYPE: string, code_NO: string, code_DESC: string,
    code_SORT: string, code_TAG: string, code_FLAG: string) {
      const dialogRef = this.dialog.open(EditComponent, {
        data: {
               code_TYPE: code_TYPE, code_NO : code_NO , code_DESC: code_DESC,
               code_SORT: code_SORT, code_TAG: code_TAG, code_FLAG: code_FLAG
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
