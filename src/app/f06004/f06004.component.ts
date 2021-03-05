import { ViewChild } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceCRUD } from '../interfaceCRUD.component';
import { F06004Service } from './f06004.service';
import { F06004addComponent } from './f06004add/f06004add.component';
import { F06004deleteComponent } from './f06004delete/f06004delete.component';
import { F06004editComponent } from './f06004edit/f06004edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f06004',
  templateUrl: './f06004.component.html',
  styleUrls: ['./f06004.component.css']
})
export class F06004Component implements OnInit, AfterViewInit, InterfaceCRUD {
  BusType: sysCode[] = [];
  RuleStep: sysCode[] = [];
  PolicyId: sysCode[] = [];
  Action: sysCode[] = [];
  YnOption: sysCode[] = [];
  BusTypeValue: string;
  RuleStepValue: string;
  ColumnIdValue: string;
  TableIdValue: string;
  FieldIdValue: string;
  PolicyIdValue: string;
  selectedValue: string;
  constructor(private f06004Service: F06004Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.BusType = JSON.parse(sessionStorage.getItem('BusType'));
    this.RuleStep = JSON.parse(sessionStorage.getItem('RuleStep'));
    this.PolicyId = JSON.parse(sessionStorage.getItem('PolicyId'));
    this.Action.push({value: 'C', viewValue: '新增'});
    this.Action.push({value: 'R', viewValue: '查詢'});
    this.Action.push({value: 'U', viewValue: '修改'});
    this.Action.push({value: 'D', viewValue: '刪除'});
    this.YnOption.push({value: 'Y', viewValue: '允許'});
    this.YnOption.push({value: 'N', viewValue: '不允許'});
  }

//=================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  ruleStep2ColSource = new MatTableDataSource<any>();
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

  changeSelect(): void {
    const formData = new FormData();
    formData.append('bustype', this.BusTypeValue != null ? this.BusTypeValue : '');
    formData.append('stepid', this.RuleStepValue != null ? this.RuleStepValue : '');
    formData.append('colid', this.ColumnIdValue != null ? this.ColumnIdValue : '');
    formData.append('tableid', this.TableIdValue != null ? this.TableIdValue : '');
    formData.append('fieleid', this.FieldIdValue != null ? this.FieldIdValue : '');
    formData.append('policyid', this.PolicyIdValue != null ? this.PolicyIdValue : '');
    this.f06004Service.getRuleStep2ColFormData(this.currentPage.pageIndex, this.currentPage.pageSize, formData)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleStep2ColSource.data = data.items;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ruleStep2ColSource.filter = filterValue.trim().toLowerCase();
  }

  changeSort(sortInfo: Sort): void {
    this.currentSort = sortInfo;
    this.getViewDataList();
  }

  getViewDataList(): void {
    this.f06004Service.getRuleStep2Col(this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      this.totalCount = data.size;
      this.ruleStep2ColSource.data = data.items;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(F06004addComponent, {
      data: {
              BusType: this.BusType,
              RuleStep: this.RuleStep,
              PolicyId: this.PolicyId,
              YnOption: this.YnOption,
              Action: this.Action
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number, parmArray: string[]) {
      const dialogRef = this.dialog.open(F06004editComponent, {
        data: {
                BustypeValue: parmArray[0],
                PolicyIdValue: parmArray[1],
                RuleStepValue: parmArray[2],
                ColumnIdValue: parmArray[3],
                TableIdValue: parmArray[4],
                FieldIdValue: parmArray[5],
                ConditionWhere: parmArray[6],
                SearchFlagVal: parmArray[7],
                PolicyAction: parmArray[8],
                BusType: this.BusType,
                RuleStep: this.RuleStep,
                PolicyId: this.PolicyId,
                YnOption: this.YnOption,
                Action: this.Action
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result != null && result === 1) { this.refreshTable(); }
      });
  }

  deleteItem(i: number, parmArray: string[]) {
      const dialogRef = this.dialog.open(F06004deleteComponent, {
        data: {
                bustype: parmArray[0],
                policyid: this.getOptionDesc(this.PolicyId, parmArray[1]),
                stepid: this.getOptionDesc(this.RuleStep, parmArray[2]),
                colid: parmArray[3],
                tableid: parmArray[4],
                fieleid: parmArray[5]
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        // if (result != null && result === 1) { this.refreshTable(); }
      });
  }
}
