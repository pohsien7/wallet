import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterfaceCRUD } from '../interfaceCRUD.component';
import { F06005Service } from './f06005.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f06005',
  templateUrl: './f06005.component.html',
  styleUrls: ['./f06005.component.css']
})
export class F06005Component implements OnInit, AfterViewInit, InterfaceCRUD {
  BusType: sysCode[] = [];
  RuleStep: sysCode[] = [];
  PolicyId: sysCode[] = [];
  PolicyType: sysCode[] = [];
  BusTypeValue: string;
  RuleStepValue: string;
  PolicyIdValue: string;
  PolicyTypeVal: string;
  selectedValue: string;
  constructor(private f06005Service: F06005Service, public dialog: MatDialog) { }
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
    formData.append('policyid', this.PolicyIdValue != null ? this.PolicyIdValue : '');
    formData.append('policytype', this.PolicyTypeVal != null ? this.PolicyTypeVal : '');
    this.f06005Service.getRulePolicyFormData(this.currentPage.pageIndex, this.currentPage.pageSize, formData)
    .subscribe(data => {
      this.totalCount = data.size;
      this.rulePolicySource.data = data.items;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rulePolicySource.filter = filterValue.trim().toLowerCase();
  }
  changeSort(sortInfo: Sort): void {
    this.currentSort = sortInfo;
    this.getViewDataList();
  }
  getViewDataList(): void {
    this.f06005Service.getRulePolicy(this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      this.totalCount = data.size;
      this.rulePolicySource.data = data.items;
    });
  }
  addNew(): void {
    // const dialogRef = this.dialog.open(F06004addComponent, {
    //   data: {
    //           BusType: this.BusType,
    //           RuleStep: this.RuleStep,
    //           PolicyId: this.PolicyId,
    //           YnOption: this.YnOption,
    //           Action: this.Action
    //         }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // if (result.event == 'success') { this.refreshTable(); }
    // });
  }
  startEdit(index: number, parmArray: string[]): void {
    // const dialogRef = this.dialog.open(F06004editComponent, {
    //   data: {
    //           BustypeValue: parmArray[0],
    //           PolicyIdValue: parmArray[1],
    //           RuleStepValue: parmArray[2],
    //           ColumnIdValue: parmArray[3],
    //           TableIdValue: parmArray[4],
    //           FieldIdValue: parmArray[5],
    //           ConditionWhere: parmArray[6],
    //           SearchFlagVal: parmArray[7],
    //           PolicyAction: parmArray[8],
    //           BusType: this.BusType,
    //           RuleStep: this.RuleStep,
    //           PolicyId: this.PolicyId,
    //           YnOption: this.YnOption,
    //           Action: this.Action
    //         }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // if (result === 1) { this.refreshTable(); }
    // });
  }
  deleteItem(index: number, parmArray: string[]): void {
    // const dialogRef = this.dialog.open(F06004deleteComponent, {
    //   data: {
    //           bustype: parmArray[0],
    //           policyid: this.getOptionDesc(this.PolicyId, parmArray[1]),
    //           stepid: this.getOptionDesc(this.RuleStep, parmArray[2]),
    //           colid: parmArray[3],
    //           tableid: parmArray[4],
    //           fieleid: parmArray[5]
    //         }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // if (result === 1) { this.refreshTable(); }
    // });
  }
//=================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  rulePolicySource = new MatTableDataSource<any>();
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
  ngOnInit(): void {
    this.BusType = JSON.parse(sessionStorage.getItem('BusType'));
    this.RuleStep = JSON.parse(sessionStorage.getItem('RuleStep'));
    this.PolicyId = JSON.parse(sessionStorage.getItem('PolicyId'));
    this.PolicyType.push({value: '1', viewValue: '分件'});
    this.PolicyType.push({value: '2', viewValue: '單一條件值'});
    this.PolicyType.push({value: '3', viewValue: '多值條件'});
    this.PolicyType.push({value: '4', viewValue: '函數計算'});
  }

}
