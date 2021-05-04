import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02006Service } from './f02006.service';
import { F02006confirmComponent } from './f02006confirm/f02006confirm.component';
import { F02006wopenComponent } from './f02006wopen/f02006wopen.component';

@Component({
  selector: 'app-f02006',
  templateUrl: './f02006.component.html',
  styleUrls: ['./f02006.component.css','../../assets/css/f02.css']
})
export class F02006Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.maxLength(30)]]
  });

  resultForm: FormGroup = this.fb.group({
    senderID : ['', []],
    recipientID: ['', []],
    authorizedPartyID: ['', []],
    recipientDN: ['', []],
    cvc: ['', []],
    amount: ['', []],
    senderBalance: ['', []],
    recipientBalance: ['', []],
    senderSN: ['', []],

    won: ['', []],
    remark: ['', []],
    txnTime: ['', []]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02006Service: F02006Service, public dialog: MatDialog) { }

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
      await this.f02006Service.sendConsumer('consumer/f02006', formdata).then((data) => {
        console.log(data)
        msg = data.statusMessage;
        this.resultForm.patchValue({ senderID : data.ledgerState.senderID });
        this.resultForm.patchValue({ recipientID : data.ledgerState.recipientID });
        this.resultForm.patchValue({ authorizedPartyID : data.ledgerState.authorizedPartyID });
        this.resultForm.patchValue({ recipientDN : data.ledgerState.recipientDN });
        this.resultForm.patchValue({ cvc : data.ledgerState.cvc });
        this.resultForm.patchValue({ frozen : data.ledgerState.frozen });
        this.resultForm.patchValue({ disabled : data.ledgerState.disabled });
        this.resultForm.patchValue({ settingLastModified : data.ledgerState.settingLastModified });
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02006confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02006wopenComponent, {
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
