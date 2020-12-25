import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04001Service } from '../f04001.service';
import { AddConfirmComponent } from './add-confirm/add-confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {
  isExist: boolean = false;
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f04001Service: F04001Service, public dialog: MatDialog) { }

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
      if (await this.f04001Service.checkMappgingExist(this.data)) {
        const childernDialogRef = this.dialog.open(AddConfirmComponent, {
          data: { msgStr: '該類別已存在此代碼' }
        });

      } else {
        this.f04001Service.insertMappingCode(this.data);
        const childernDialogRef = this.dialog.open(AddConfirmComponent, {
          data: { msgStr: '儲存成功！' }
        });
        this.dialogRef.close({ event:'success' })
      }
    }
}
