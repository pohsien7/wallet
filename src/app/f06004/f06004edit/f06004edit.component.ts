import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEdit } from 'src/app/interfaceCRUD.component';
import { F06004Service } from '../f06004.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f06004edit.component.html',
  styleUrls: ['./f06004edit.component.css']
})
export class F06004editComponent implements OnInit, DialogEdit {
  BusType: sysCode[] = this.data.BusType;
  RuleStep: sysCode[] = this.data.RuleStep;
  PolicyId: sysCode[] = this.data.PolicyId;
  Action: sysCode[] = this.data.Action;
  YnOption: sysCode[] = this.data.YnOption;
  BusTypeValue: string = this.data.BustypeValue;
  RuleStepValue: string = this.data.RuleStepValue;
  ColumnIdValue: string = this.data.ColumnIdValue;
  TableIdValue: string = this.data.TableIdValue;
  FieldIdValue: string = this.data.FieldIdValue;
  PolicyIdValue: string = this.data.PolicyIdValue;
  Conditionwhere: string = this.data.ConditionWhere;
  SearchFlagVal: string = this.data.SearchFlagVal;
  PolicyAction: string = this.data.PolicyAction;
  constructor(public dialogRef: MatDialogRef<F06004editComponent>,
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

  stopEdit(): void {

  }

}
