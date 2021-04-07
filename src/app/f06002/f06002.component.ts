import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceCRUD } from '../interfaceCRUD.component';
import { F06002Service } from './f06002.service';
import { F06002addComponent } from './f06002add/f06002add.component';
import { F06002deleteComponent } from './f06002delete/f06002delete.component';
import { F06002editComponent } from './f06002edit/f06002edit.component';


interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f06001',
  templateUrl: './f06002.component.html',
  styleUrls: ['./f06002.component.css']
})
export class F06002Component implements OnInit, AfterViewInit, InterfaceCRUD {
  sysCode: sysCode[] = [];
  selectedValue: string;
  constructor(private f06002Service: F06002Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.f06002Service.getRuleParmOption().subscribe(data => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['conditionid'];
        const desc = jsonObj['conditiondesc'];
        this.sysCode.push({value: codeNo, viewValue: desc})
      }
    });
  }

//=================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  ruleParamCondition = new MatTableDataSource<any>();
  ngAfterViewInit(): void {
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
      this.getViewDataList();
    });
    this.getViewDataList();
  }

//=================================================================
  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  changeSelect() {
    const filterValue = this.selectedValue;
    this.ruleParamCondition.filter = filterValue.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ruleParamCondition.filter = filterValue.trim().toLowerCase();
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getViewDataList();
  }

  getViewDataList() {
    this.f06002Service.getRuleParmList(this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleParamCondition.data = data.items;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(F06002addComponent, {
      data: { conditionid: '', conditiondesc: '', conditionwhere: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number, parmArray: string[]) {
      const dialogRef = this.dialog.open(F06002editComponent, {
        data: { conditionid: parmArray[0], conditiondesc: parmArray[1] , conditionwhere: parmArray[2] }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result != null && result === 1) { this.refreshTable(); }
      });
  }

  deleteItem(i: number, parmArray: string[]) {
      const dialogRef = this.dialog.open(F06002deleteComponent, {
        data: { conditionid: parmArray[0] }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result != null && result === 1) { this.refreshTable(); }
      });
  }
}
