import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEdit } from 'src/app/interfaceCRUD.component';
import { F06003Service } from '../f06003.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f06003edit.component.html',
  styleUrls: ['./f06003edit.component.css']
})
export class F06003editComponent implements OnInit, DialogEdit {
  ParmData: sysCode[] = null;
  BusTypeValue: string = this.data.BusTypeValue;
  RuleStepValue: string = this.data.RuleStepValue;
  ParmDataValue: string = this.data.ParmIdValeu;
  constructor(public dialogRef: MatDialogRef<F06003editComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06003Service: F06003Service, public dialog: MatDialog) { }

    ngOnInit(): void {
      this.data.BusType = JSON.parse(sessionStorage.getItem('BusType'));
      this.data.RuleStep = JSON.parse(sessionStorage.getItem('RuleStep'));
      this.changeSelect();
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

    stopEdit(): void {
      // this.f04001Service.updateMappingCode(this.data);
    }

}
