import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04002Service } from '../f04002.service';

interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f04002edit.component.html',
  styleUrls: ['./f04002edit.component.css']
})
export class F04002editComponent {
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F04002editComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f04002Service: F04002Service) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  submit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.f04002Service.updateAdrCode(this.data);
  }

}
