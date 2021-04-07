import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAdd } from 'src/app/interfaceCRUD.component';
import { F06001Service } from '../f06001.service';

@Component({
  templateUrl: './f06001add.component.html',
  styleUrls: ['./f06001add.component.css']
})
export class F06001addComponent implements DialogAdd {
  BusTypeValue: string;
  ParmTypeValue: string;
  ParmDimValue: string;
  ParmClassValue: string;
  ConditionValue: string;
  ParmIdValue: string;
  ParmNameValue: string;
  ParmValue: string;
  ParmDefaultValue: string;
  constructor(public dialogRef: MatDialogRef<F06001addComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06001Service: F06001Service, public dialog: MatDialog) { }


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
