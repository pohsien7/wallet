import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04001Service } from '../f04001.service';
import { F04001confirmComponent } from '../f04001confirm/f04001confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<AddComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f04001Service: F04001Service, public dialog: MatDialog) { }

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
    let msgStr: string = "";
    let baseUrl = 'SystemCodeSet/Add';
    msgStr = await this.f04001Service.addOrEditSystemCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F04001confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }
}
