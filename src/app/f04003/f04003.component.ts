import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04003Service } from './f04003.service';
import { F04003addComponent } from './f04003add/f04003add.component';
import { F04003editComponent } from './f04003edit/f04003edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04003',
  templateUrl: './f04003.component.html',
  styleUrls: ['./f04003.component.css']
})
export class F04003Component implements OnInit, AfterViewInit {
  ynValue: string;
  unitValue: string;
  empNoValue: string;
  groupValue: string;
  sysCode: sysCode[] = [];
  unitCode: sysCode[] = [];
  groupCode: sysCode[] = [];
  ynCode: sysCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(private f04003Service: F04003Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.f04003Service.getSysTypeCode('GEN_UNIT').subscribe(data => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.unitCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f04003Service.getGroupCode().subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['GROUP_NO'];
        const desc = jsonObj['GROUP_NAME'];
        this.groupCode.push({value: codeNo, viewValue: desc})
      }
    });

  }
//============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  employeeSource = new MatTableDataSource<any>();
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
      this.getEmployeeList();
    });
  }

  getEmployeeList() {
    let formData = new FormData();
    formData.append('empNo', this.empNoValue != null ?　this.empNoValue : '');
    formData.append('onJob', this.ynValue != null ?　this.ynValue : '');
    formData.append('unit', this.unitValue != null ?　this.unitValue : '');
    formData.append('group', this.groupValue != null ?　this.groupValue : '');
    this.f04003Service.getEmployeeList(this.currentPage.pageIndex, this.currentPage.pageSize, formData)
    .subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.employeeSource.data = data.rspBody.items;
    });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getEmployeeList();
  }

  changeSelect() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getEmployeeList();
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






  addNew() {
      const dialogRef = this.dialog.open(F04003addComponent, {
        data: {
                code_TYPE: '',
                code_NO : '' , code_DESC: '',
                code_SORT: '', code_TAG: '',
                code_FLAG: 'N'
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'success') { this.refreshTable(); }
      });
  }

  startEdit(i: number,
    code_TYPE: string, code_NO: string, code_DESC: string,
    code_SORT: string, code_TAG: string, code_FLAG: string) {
      const dialogRef = this.dialog.open(F04003editComponent, {
        data: {
               code_TYPE: code_TYPE, code_NO : code_NO , code_DESC: code_DESC,
               code_SORT: code_SORT, code_TAG: code_TAG, code_FLAG: code_FLAG
              }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) { this.refreshTable(); }
      });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
