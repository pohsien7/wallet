import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02005Service } from './f02005.service';
import { F02005confirmComponent } from './f02005confirm/f02005confirm.component';
import { F02005wopenComponent } from './f02005wopen/f02005wopen.component';

@Component({
  selector: 'app-f02005',
  templateUrl: './f02005.component.html',
  styleUrls: ['./f02005.component.css']
})
export class F02005Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.maxLength(30)]]
  });

  resultForm: FormGroup = this.fb.group({
    balance : ['', []],
    totalCount: ['', []],
    statusLastModified: ['', []],
    type: ['', []],
    mcc: ['', []],
    frozen: ['', []],
    disabled: ['', []],
    settingLastModified: ['', []]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02005Service: F02005Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料必填喔!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      await this.f02005Service.sendConsumer('consumer/f02005', formdata).then((data) => {
        msg = data.statusMessage;
        this.resultForm.patchValue({ balance : data.wallet.balance });
        this.resultForm.patchValue({ totalCount : data.wallet.totalCount });
        this.resultForm.patchValue({ statusLastModified : data.wallet.statusLastModified });
        this.resultForm.patchValue({ type : data.wallet.type });
        this.resultForm.patchValue({ mcc : data.wallet.mcc });
        this.resultForm.patchValue({ frozen : data.wallet.frozen });
        this.resultForm.patchValue({ disabled : data.wallet.disabled });
        this.resultForm.patchValue({ settingLastModified : data.wallet.settingLastModified });
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02005confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02005wopenComponent, {
      data: { queryWalletID: this.registrationForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.registrationForm.patchValue({ queryWalletID : result.value });
      }
    });
  }

}
