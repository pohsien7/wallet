import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F06001Service } from './f06001.service';
import { F06001addComponent } from './f06001add/f06001add.component';
import { F06001deleteComponent } from './f06001delete/f06001delete.component';
import { F06001editComponent } from './f06001edit/f06001edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f06001',
  templateUrl: './f06001.component.html',
  styleUrls: ['./f06001.component.css']
})
export class F06001Component implements OnInit, AfterViewInit {
  BusType: sysCode[] = [];
  ParmType: sysCode[] = [];
  ParmDim: sysCode[] = [];
  ParmClass: sysCode[] = [];
  Condition: sysCode[] = [];
  selectedValue: string;
  BusTypeValue: string;
  ParmTypeValue: string;
  ParmDimValue: string;
  ParmClassValue: string;
  ConditionValue: string;
  ParmIdValue: string;
  ParmNameValue: string;
  ParmValue: string;
  ParmDefaultValue: string;

  constructor(private f06001Service: F06001Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.BusType = JSON.parse(sessionStorage.getItem('BusType'));
    this.ParmType = JSON.parse(sessionStorage.getItem('ParmType'));
    this.ParmDim = JSON.parse(sessionStorage.getItem('ParmDim'));
    this.ParmClass = JSON.parse(sessionStorage.getItem('ParmClass'));
    this.Condition = JSON.parse(sessionStorage.getItem('Condition'));
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
      this.getRuleParmList();
    });
    this.getRuleParmList();
  }

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
    const formData = new FormData();
    formData.append('bustype', this.BusTypeValue != null ? this.BusTypeValue : '');
    formData.append('parmtype', this.ParmTypeValue != null ? this.ParmTypeValue : '');
    formData.append('parmdim', this.ParmDimValue != null ? this.ParmDimValue : '');
    formData.append('parmclass', this.ParmClassValue != null ? this.ParmClassValue : '');
    formData.append('condition', this.ConditionValue != null ? this.ConditionValue : '');
    formData.append('parmid', this.ParmIdValue != null ? this.ParmIdValue : '');
    formData.append('parmname', this.ParmNameValue != null ? this.ParmNameValue : '');
    formData.append('parmvalue', this.ParmValue != null ? this.ParmValue : '');
    formData.append('parmdefault', this.ParmDefaultValue != null ? this.ParmDefaultValue : '');
    this.f06001Service.getRuleParmWithFormData(this.currentPage.pageIndex, this.currentPage.pageSize, formData)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleParamCondition.data = data.items;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ruleParamCondition.filter = filterValue.trim().toLowerCase();
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getRuleParmList();
  }

  getRuleParmList() {
    this.f06001Service.getRuleParmList(this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleParamCondition.data = data.items;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(F06001addComponent, {
      data: {
              BusType: this.BusType,
              ParmType: this.ParmType,
              ParmDim: this.ParmDim,
              ParmClass: this.ParmClass,
              Condition: this.Condition
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number, bustype: string, parmid: string, parmname: string,
                       parmtype: string, parmdim: string, parmvalue: string,
                       condition: string, parmdefault: string, parmclass: string) {
      const dialogRef = this.dialog.open(F06001editComponent, {
        data: {
                bustype: bustype,
                parmid: parmid,
                parmname: parmname,
                parmtype: parmtype,
                parmdim: parmdim,
                parmvalue: parmvalue,
                condition: condition,
                parmdefault: parmdefault,
                parmclass: parmclass,
                BusType: this.BusType,
                ParmType: this.ParmType,
                ParmDim: this.ParmDim,
                ParmClass: this.ParmClass,
                Condition: this.Condition
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result === 1) { this.refreshTable(); }
      });
  }

  deleteItem(i: number, conditionid: string) {
      const dialogRef = this.dialog.open(F06001deleteComponent, {
        data: { conditionid: conditionid }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result === 1) { this.refreshTable(); }
      });
  }
}
