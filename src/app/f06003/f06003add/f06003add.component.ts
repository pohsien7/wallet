import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAdd } from 'src/app/interfaceCRUD.component';
import { F06003Service } from '../f06003.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f06003add.component.html',
  styleUrls: ['./f06003add.component.css']
})
export class F06003addComponent implements OnInit, DialogAdd {
  ParmData: sysCode[] = null;
  BusTypeValue: string;
  RuleStepValue: string;
  ParmDataValue: string;
  constructor(public dialogRef: MatDialogRef<F06003addComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06003Service: F06003Service, public dialog: MatDialog) { }

    ngOnInit(): void {
      this.data.BusType = JSON.parse(sessionStorage.getItem('BusType'));
      this.data.RuleStep = JSON.parse(sessionStorage.getItem('RuleStep'));
    }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required') ? '此欄位必填!' :
      this.formControl.hasError('email') ? 'Not a valid email' :
      '';
    }

    submit() {

    }

    changeSelect() {
      this.ParmData = [];
      this.f06003Service.getRuleParmWhereBusType(this.BusTypeValue).subscribe(data => {
        for (const jsonObj of data) {
          const codeNo = jsonObj['code_NO'];
          const desc = jsonObj['code_DESC'];
          this.ParmData.push({value: codeNo, viewValue: desc})
        }
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public async confirmAdd(): Promise<void> {
      // if (await this.f04001Service.checkMappgingExist(this.data)) {
      //   const childernDialogRef = this.dialog.open(AddConfirmComponent, {
      //     data: { msgStr: '該類別已存在此代碼' }
      //   });

      // } else {
      //   this.f04001Service.insertMappingCode(this.data);
      //   const childernDialogRef = this.dialog.open(AddConfirmComponent, {
      //     data: { msgStr: '儲存成功！' }
      //   });
      //   this.dialogRef.close({ event:'success' })
      // }
    }

}
