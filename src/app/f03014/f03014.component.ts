import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03014Service } from './f03014.service';
import { F03014confirmComponent } from './f03014confirm/f03014confirm.component';
import { F03014wopenComponent } from './f03014wopen/f03014wopen.component';

@Component({
  selector: 'app-f03014',
  templateUrl: './f03014.component.html',
  styleUrls: ['./f03014.component.css', '../../assets/css/f03.css']
})
export class F03014Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  voidAuthorizaionForm: FormGroup = this.fb.group({
    operation: ['withdraw', [Validators.required, Validators.maxLength(30)]],
    authID: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(30)]],
    walletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    recipientID: ['', [Validators.required, Validators.maxLength(23)]],
    remark: ['', [Validators.maxLength(30)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f03014Service: F03014Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.voidAuthorizaionForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.voidAuthorizaionForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.voidAuthorizaionForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f03014Service.sendConsumer('consumer/f03014', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03014confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03014wopenComponent, {
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.voidAuthorizaionForm.patchValue({ authID: result.authID });
        this.voidAuthorizaionForm.patchValue({ walletID: result.walletID });
        this.voidAuthorizaionForm.patchValue({ recipientID: result.recipientID });
      }
    });
  }
}
