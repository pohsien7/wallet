import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04003Service } from '../f04003.service';
import { F04003confirmComponent } from '../f04003confirm/f04003confirm.component';

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  templateUrl: './f04003role.component.html',
  styleUrls: ['./f04003role.component.css']
})
export class F04003roleComponent {
  constructor(public dialogRef: MatDialogRef<F04003roleComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f04003Service: F04003Service) { }

  submit() {
  }

  setAll(completed: boolean) {
    for (const obj of this.data.CHECKBOX) {
      obj.completed = completed;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async confirmAdd(): Promise<void> {
    var valArray: string[] = new Array;
    for (const obj of this.data.CHECKBOX) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const formData: FormData = new FormData();
    formData.append("empNo", this.data.EMPNO);
    formData.append("roleNo", valArray.toString());
    let msgStr = '';
    const baseUrl = 'EmployeeSet/saveRole';
     this.f04003Service.saveEmployeeRole(baseUrl, formData).subscribe(data => {
      msgStr = (data.rspCode === '0000' && data.rspMsg === '成功') ? '儲存成功！' : '儲存失敗！';
      const childernDialogRef = this.dialog.open(F04003confirmComponent, {
        data: { msgStr: msgStr }
      });
      if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
    });
  }
}
