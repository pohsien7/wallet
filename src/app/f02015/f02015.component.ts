import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02015Service } from './f02015.service';
import { F02015confirmComponent } from './f02015confirm/f02015confirm.component';
import { F02015wopenComponent } from './f02015wopen/f02015wopen.component';

@Component({
  selector: 'app-f02015',
  templateUrl: './f02015.component.html',
  styleUrls: ['./f02015.component.css', '../../assets/css/f02.css']
})
export class F02015Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  queryWalletAuthorizationForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.required]],
    authID: ['', [Validators.required]],
    operation: ['']
  });

  resultForm: FormGroup = this.fb.group({
    authID: ['', []],
    operation: ['', []],
    senderID: ['', []],
    authorizedAgencyID: ['', []],
    recipientID: ['', []],
    remark: ['', []],
    voidRemark: ['', []],
    status: ['', []],
    createTime: ['', []]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02015Service: F02015Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.queryWalletAuthorizationForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : '';
  }

  async sendCBDC() {
    this.clear();
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.queryWalletAuthorizationForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.queryWalletAuthorizationForm.value));
      await this.f02015Service.sendConsumer('consumer/f02015', formdata).then((data) => {
        msg = data.statusMessage;
        if (data.statusMessage == 'Success') {
          this.resultForm.patchValue({ authID: data.authorizationList[0].authID });
          this.resultForm.patchValue({ operation: data.authorizationList[0].operation });
          this.resultForm.patchValue({ senderID: data.authorizationList[0].senderID });
          this.resultForm.patchValue({ authorizedAgencyID: data.authorizationList[0].authorizedAgencyID });
          this.resultForm.patchValue({ recipientID: data.authorizationList[0].recipientID });
          this.resultForm.patchValue({ remark: data.authorizationList[0].remark });
          this.resultForm.patchValue({ voidRemark: data.authorizationList[0].voidRemark });
          this.resultForm.patchValue({ status: data.authorizationList[0].status });
          this.resultForm.patchValue({ createTime: data.authorizationList[0].createTime });
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02015confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02015wopenComponent, {
      data: { walletID: this.queryWalletAuthorizationForm.value.walletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.queryWalletAuthorizationForm.patchValue({ walletID: result.walletID });
        this.queryWalletAuthorizationForm.patchValue({ authID: result.authID });
        this.queryWalletAuthorizationForm.patchValue({ operation: result.operation });
      }
    });
  }

  clear() {
    this.resultForm.patchValue({ authID: '' });
    this.resultForm.patchValue({ operation: '' });
    this.resultForm.patchValue({ senderID: '' });
    this.resultForm.patchValue({ authorizedAgencyID: '' });
    this.resultForm.patchValue({ recipientID: '' });
    this.resultForm.patchValue({ remark: '' });
    this.resultForm.patchValue({ voidRemark: '' });
    this.resultForm.patchValue({ status: '' });
    this.resultForm.patchValue({ createTime: '' });
  }
}
