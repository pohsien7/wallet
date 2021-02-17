import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04002Service } from '../f04002.service';
import { F04002addConfirmComponent } from './f04002add-confirm/f04002add-confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f04002add.component.html',
  styleUrls: ['./f04002add.component.css']
})
export class F04002addComponent {
  isExist: boolean = false;
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F04002addComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f04002Service: F04002Service, public dialog: MatDialog) { }

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
      if (await this.f04002Service.checkAdrCodeExist(this.data)) {
        const childernDialogRef = this.dialog.open(F04002addConfirmComponent, {
          data: { msgStr: '該類別已存在此代碼' }
        });

      } else {
        this.f04002Service.insertAdrCode(this.data);
        const childernDialogRef = this.dialog.open(F04002addConfirmComponent, {
          data: { msgStr: '儲存成功！' }
        });
        this.dialogRef.close({ event:'success' })
      }
    }
}
