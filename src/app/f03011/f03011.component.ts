import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03011Service } from './f03011.service';
import { F03011confirmComponent } from './f03011confirm/f03011confirm.component';
import { F03011wopenComponent } from './f03011wopen/f03011wopen.component';

interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03011',
  templateUrl: './f03011.component.html',
  styleUrls: ['./f03011.component.css', '../../assets/css/f03.css']
})
export class F03011Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }];

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  queryWalletLedgerForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.maxLength(25)]],
    queryTxnID: ['', []],
    cvc: ['0901', [Validators.maxLength(4)]],
    transType: []
  });

  resultForm: FormGroup = this.fb.group({
    txnID : ['', []],
    senderID: ['', []],
    recipientID: ['', []],
    authorizedAgencyID: ['', []],
    recipientDN: ['', []],
    cvc: ['', []],
    amount: ['', []],
    balance: ['', []],
    sn: ['', []],
    won: ['', []],
    remark: ['', []],
    txnTime: ['', []],
    result: ['', []],
    paymentMethod: ['', []]
  });

  submitted = false;
  constructor(private fb: FormBuilder, public f03011Service: F03011Service, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    '';
  }

  isFieldEmpty() {
    if(this.queryWalletLedgerForm.value.walletID == '' && this.queryWalletLedgerForm.value.queryTxnID == ''
      && this.queryWalletLedgerForm.value.cvc ==''
    ) {
      return true;
    }
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.queryWalletLedgerForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.queryWalletLedgerForm.value));
      await this.f03011Service.sendConsumer('consumer/f03011', formdata).then((data) => {
        if (data.statusCode == "0000") {
          this.resultForm.patchValue({ txnID : data.ledgerState.txnID });
          this.resultForm.patchValue({ senderID : data.ledgerState.senderID });
          this.resultForm.patchValue({ recipientID : data.ledgerState.recipientID });
          this.resultForm.patchValue({ authorizedAgencyID : data.ledgerState.authorizedAgencyID });
          this.resultForm.patchValue({ recipientDN : data.ledgerState.recipientDN });
          this.resultForm.patchValue({ cvc : data.ledgerState.cvc });
          this.resultForm.patchValue({ amount : data.ledgerState.amount });
          this.resultForm.patchValue({ balance : data.ledgerState.balance });
          this.resultForm.patchValue({ sn : data.ledgerState.sn });
          this.resultForm.patchValue({ won : data.ledgerState.won });
          this.resultForm.patchValue({ remark : data.ledgerState.remark });
          this.resultForm.patchValue({ txnTime : data.ledgerState.txnTime });
          this.resultForm.patchValue({ result : data.ledgerState.result });
          this.resultForm.patchValue({ paymentMethod : data.ledgerState.paymentMethod });
          msg = data.statusMessage;
        } else {
          msg = data.statusMessage;
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03011confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList(id: string) {
    const dialogRef = this.dialog.open(F03011wopenComponent, {
      data: { walletID: this.queryWalletLedgerForm.value.walletid },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.queryWalletLedgerForm.patchValue({ walletID: result.value });
        this.queryWalletLedgerForm.patchValue({ queryTxnID: result.txnID });
        this.queryWalletLedgerForm.patchValue({ transType: result.valueTransType });
      }
    });
  }

  clear() {
    this.queryWalletLedgerForm.patchValue({
      walletID:'', queryTxnID:'', cvc:''
    });
  }

}
