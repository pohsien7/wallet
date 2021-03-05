import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04002Service } from '../f04002.service';
import { F04002confirmComponent } from '../f04002confirm/f04002confirm.component';

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
  constructor(public dialogRef: MatDialogRef<F04002editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f04002Service: F04002Service) { }

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

  public async stopEdit(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'AdrCodeSet/Edit';
    msgStr = await this.f04002Service.addOrEditAdrCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F04002confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }
}
