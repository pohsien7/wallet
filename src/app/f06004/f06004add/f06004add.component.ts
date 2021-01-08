import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAdd } from 'src/app/interfaceCRUD.component';
import { F06004Service } from '../f06004.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f06004add.component.html',
  styleUrls: ['./f06004add.component.css']
})
export class F06004addComponent implements OnInit, DialogAdd {
  BusType: sysCode[] = this.data.BusType;
  RuleStep: sysCode[] = this.data.RuleStep;
  PolicyId: sysCode[] = this.data.PolicyId;
  Action: sysCode[] = this.data.Action;
  YnOption: sysCode[] = this.data.YnOption;
  BusTypeValue: string;
  RuleStepValue: string;
  ColumnIdValue: string;
  TableIdValue: string;
  FieldIdValue: string;
  PolicyIdValue: string;
  Conditionwhere: string;
  SearchFlagVal: string;
  PolicyAction: string;
  constructor(public dialogRef: MatDialogRef<F06004addComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06004Service: F06004Service, public dialog: MatDialog) { }

  ngOnInit(): void {

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

  submit(): void {

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
