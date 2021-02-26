import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04003Service } from '../f04003.service';
import { F04003confirmComponent } from '../f04003confirm/f04003confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f04003edit.component.html',
  styleUrls: ['./f04003edit.component.css']
})

export class F04003editComponent {
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F04003editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f04003Service: F04003Service) { }

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
    let baseUrl = 'http://localhost:8080/EmployeeSet/Edit';
    msgStr = await this.f04003Service.addOrEditSystemCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F04003confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }
}
