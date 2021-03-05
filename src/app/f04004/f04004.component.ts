import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { F04004Service } from './f04004.service';
import { F04004confirmComponent } from './f04004confirm/f04004confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f04004',
  templateUrl: './f04004.component.html',
  styleUrls: ['./f04004.component.css']
})
export class F04004Component implements OnInit, AfterViewInit {
  isAllCheck: boolean = false;
  sysCode: sysCode[] = [];
  chkArray: checkBox[] = [];
  selectedValue: string;
  roleFunctionSource = new MatTableDataSource<any>();
  constructor(private f04004Service: F04004Service, public dialog: MatDialog,) { }
  ngAfterViewInit() {}
  ngOnInit(): void {
    const baseUrl = 'FunctionRoleSet/option';
    this.f04004Service.getRoleOption(baseUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['role_NO'];
        const desc = jsonObj['role_NAME'];
        this.sysCode.push({value: codeNo, viewValue: desc})
      }
    });
  }

  save() {
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const formData: FormData = new FormData();
    formData.append("roleNo", this.selectedValue);
    formData.append("fnNo", valArray.toString());
    const baseUrl = 'FunctionRoleSet/save';
     this.f04004Service.saveRoleFunction(baseUrl, formData).subscribe(data => {
      const childernDialogRef = this.dialog.open(F04004confirmComponent, {
        data: { msgStr: (data.rspCode === '0000' && data.rspMsg === '成功') ? '儲存成功！' : '儲存失敗！' }
      });
    });

  }

  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

  async changeSelect() {
    this.isAllCheck = false;
    await this.getRoleFunction();
  }

  private async getRoleFunction() {
    const baseUrl = 'FunctionRoleSet/search';
    this.f04004Service.getRoleFunction(baseUrl, this.selectedValue).subscribe(data => {
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['fn_NO'];
          const isChk = jsonObj['is_CHK'];
          this.chkArray[i] = {value: chkValue, completed: isChk == 'Y'};
          i++;
        }

      } else {
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['fn_NO'];
          const isChk = jsonObj['is_CHK'];
          this.chkArray.push({value: chkValue, completed: isChk == 'Y'});
        }
      }
      this.roleFunctionSource.data = data.rspBody;
    });
  }
}
