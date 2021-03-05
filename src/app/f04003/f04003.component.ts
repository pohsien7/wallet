import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04003Service } from './f04003.service';
import { F04003addComponent } from './f04003add/f04003add.component';
import { F04003editComponent } from './f04003edit/f04003edit.component';
import { F04003roleComponent } from './f04003role/f04003role.component';

interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
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
    //this.f04003Service.getSysTypeCode('GEN_UNIT').subscribe(data => {
    const unitUrl = 'http://192.168.0.62:9082/EmployeeSet/guOption';
    this.f04003Service.getUnitCode(unitUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.unitCode.push({value: codeNo, viewValue: desc})
      }
    });
    const baseUrl = 'EmployeeSet/gmOption';
    this.f04003Service.getGroupCode(baseUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['GROUP_NO'];
        const desc = jsonObj['GROUP_NAME'];
        this.groupCode.push({value: codeNo, viewValue: desc})
      }
    });
    const roleUrl = 'EmployeeSet/getRole';
    this.f04003Service.getEmployeeRole(roleUrl).subscribe(data => {
      this.empRoleSource.data = data.rspBody;
    });
  }

//============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  employeeSource = new MatTableDataSource<any>();
  empRoleSource = new MatTableDataSource<any>();
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
    const baseUrl = 'EmployeeSet/search';
    this.f04003Service.getEmployeeList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, formData)
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

  chkArray: checkBox[] = null;
  setRoleNo(empNo: string, roleArray: string) {
    this.chkArray = [];
    let selfRole = roleArray != null ? roleArray : '';
    for (const jsonObj of this.empRoleSource.data) {
      let isChk: boolean = false;
      const chkValue = jsonObj['role_NO'];
      for (const str of selfRole.split(',')) {
        isChk = (str == chkValue);
        if (isChk) { break; }
      }
      this.chkArray.push({value: chkValue, completed: isChk});
    }

    const dialogRef = this.dialog.open(F04003roleComponent, {
      data: { CHECKBOX: this.chkArray, SOURCE: this.empRoleSource.data, EMPNO: empNo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  addNew() {
      const dialogRef = this.dialog.open(F04003addComponent, {
        data: {
          EMP_NO: '',
          EMP_NAME : '' ,
          ON_JOB: 'Y',
          EMAIL: '',
          PROMOTION_UNIT: '',
          GROUP_NO: ''
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }

  startEdit(i: number,
    EMP_NO: string, EMP_NAME: string, ON_JOB: string,
    EMAIL: string, PROMOTION_UNIT: string, GROUP_NO: string) {
      const dialogRef = this.dialog.open(F04003editComponent, {
        data: {
          EMP_NO: EMP_NO, EMP_NAME : EMP_NAME , ON_JOB: ON_JOB, EMAIL: EMAIL,
          PROMOTION_UNIT: PROMOTION_UNIT != null ? PROMOTION_UNIT : '',
          GROUP_NO: GROUP_NO != null ? GROUP_NO : '',
          UNIT: this.unitCode,
          GROUP: this.groupCode
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
