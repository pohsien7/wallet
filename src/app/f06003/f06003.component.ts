import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceCRUD } from '../interfaceCRUD.component';
import { F06003Service } from './f06003.service';
import { F06003addComponent } from './f06003add/f06003add.component';
import { F06003deleteComponent } from './f06003delete/f06003delete.component';
import { F06003editComponent } from './f06003edit/f06003edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f06003',
  templateUrl: './f06003.component.html',
  styleUrls: ['./f06003.component.css']
})
export class F06003Component implements OnInit, AfterViewInit, InterfaceCRUD {
  BusType: sysCode[] = [];
  RuleStep: sysCode[] = [];
  ParmData: sysCode[] = null;
  BusTypeValue: string;
  RuleStepValue: string;
  ParmDataValue: string;
  selectedValue: string;
  constructor(private f06003Service: F06003Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.BusType = JSON.parse(sessionStorage.getItem('BusType'));
    this.RuleStep = JSON.parse(sessionStorage.getItem('RuleStep'));
  }

//=================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  ruleParamStep = new MatTableDataSource<any>();
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
  changeSelect() {
    this.ParmData = [];
    this.f06003Service.getRuleParmWhereBusType(this.BusTypeValue).subscribe(data => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.ParmData.push({value: codeNo, viewValue: desc})
      }
    });
    this.changeOption();
  }

  changeOption() {
    const bustype = this.BusTypeValue != null ? this.BusTypeValue : '';
    const rulestep = this.RuleStepValue != null ? this.RuleStepValue : '';
    const parmdata = this.ParmDataValue != null ? this.ParmDataValue : '';
    this.f06003Service.getRuleStepWithParm(this.currentPage.pageIndex, this.currentPage.pageSize, bustype, rulestep, parmdata)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleParamStep.data = data.items;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ruleParamStep.filter = filterValue.trim().toLowerCase();
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getViewDataList();
  }

  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return codeVal + '-' + data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  getViewDataList() {
    this.f06003Service.getRuleParmStep(this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleParamStep.data = data.items;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(F06003addComponent, {
      data: {
              BusType: this.BusType,
              RuleStep: this.RuleStep
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number, parmArray: string[]) {
      const dialogRef = this.dialog.open(F06003editComponent, {
        data: {
                BusType: this.BusType,
                RuleStep: this.RuleStep,
                BusTypeValue: parmArray[0],
                RuleStepValue: parmArray[1],
                ParmIdValeu: parmArray[2]
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result != null && result === 1) { this.refreshTable(); }
      });
  }

  deleteItem(i: number, parmArray: string[]) {
      const dialogRef = this.dialog.open(F06003deleteComponent, {
        data: { bustype: parmArray[0], rulestep: parmArray[1], parmid: parmArray[2] }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result != null && result === 1) { this.refreshTable(); }
      });
  }
}
