import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAdd } from 'src/app/interfaceCRUD.component';
import { F06002Service } from '../f06002.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f06002add.component.html',
  styleUrls: ['./f06002add.component.css']
})
export class F06002addComponent implements OnInit, DialogAdd {
  ParmClass: sysCode[] = [];
  ParmClassValue: string;
  ruleParamWhereClass = new MatTableDataSource<any>();
  constructor(public dialogRef: MatDialogRef<F06002addComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06002Service: F06002Service, public dialog: MatDialog) { }

    ngOnInit(): void {
      this.ParmClass = JSON.parse(sessionStorage.getItem('ParmClass'));
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
      this.f06002Service.getRuleParmWhereClass(this.ParmClassValue).subscribe(data => {
        this.ruleParamWhereClass.data = data;
      });
    }

    getCodeToCondition(code: string) {
      this.data.conditionwhere = this.data.conditionwhere + '$' + code + '$';
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
