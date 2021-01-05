import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F06001Service } from '../f06001.service';

@Component({
  templateUrl: './f06001edit.component.html',
  styleUrls: ['./f06001edit.component.css']
})
export class F06001editComponent {
  BusTypeValue: string = this.data.bustype;
  ParmTypeValue: string = this.data.parmtype;
  ParmDimValue: string = this.data.parmdim;
  ParmClassValue: string = this.data.parmclass;
  ConditionValue: string = this.data.condition;
  ParmIdValue: string = this.data.parmid;
  ParmNameValue: string = this.data.parmname;
  ParmValue: string = this.data.parmvalue;
  ParmDefaultValue: string = this.data.parmdefault;;
  constructor(public dialogRef: MatDialogRef<F06001editComponent>,
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

    stopEdit(): void {
      // this.f04001Service.updateMappingCode(this.data);
    }
}
