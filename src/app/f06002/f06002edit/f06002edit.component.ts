import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { F06002Service } from '../f06002.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f06002edit.component.html',
  styleUrls: ['./f06002edit.component.css']
})
export class F06002editComponent implements OnInit {
  ParmClass: sysCode[] = [];
  ParmClassValue: string;
  ruleParamWhereClass = new MatTableDataSource<any>();
  constructor(public dialogRef: MatDialogRef<F06002editComponent>,
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

    stopEdit(): void {
      // this.f04001Service.updateMappingCode(this.data);
    }
}
