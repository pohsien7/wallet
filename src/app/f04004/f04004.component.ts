import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { F04004Service } from './f04004.service';

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
  sysCode: sysCode[] = [];
  chkArray: checkBox[] = [];
  selectedValue: string;
  roleFunctionSource = new MatTableDataSource<any>();
  constructor(private f04004Service: F04004Service) { }
  ngAfterViewInit() {}
  ngOnInit(): void {
    this.f04004Service.getRoleOption().subscribe(data => {
      for (const jsonObj of data.RspBody) {
        const codeNo = jsonObj['ROLE_NO'];
        const desc = jsonObj['ROLE_NAME'];
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
    this.f04004Service.saveRoleFunction(formData).subscribe(data => {
      alert((data.RspCode === '0000' && data.RspMsg === '成功') ? '儲存成功！' : '儲存失敗！');
    });
  }

  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

  async changeSelect() {
    await this.getRoleFunction();
  }

  private async getRoleFunction() {
    this.f04004Service.getRoleFunction(this.selectedValue).subscribe(data => {
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.RspBody) {
          const chkValue = jsonObj['FN_NO'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray[i] = {value: chkValue, completed: isChk == 'Y'};
          i++;
        }

      } else {
        for (const jsonObj of data.RspBody) {
          const chkValue = jsonObj['FN_NO'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray.push({value: chkValue, completed: isChk == 'Y'});
        }
      }
      this.roleFunctionSource.data = data.RspBody;
    });
  }
}
