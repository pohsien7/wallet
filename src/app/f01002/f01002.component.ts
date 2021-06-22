import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01002Service } from './f01002.service';
import { F01002confirmComponent } from './f01002confirm/f01002confirm.component';
import { F01002wopenComponent } from './f01002wopen/f01002wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01002',
  templateUrl: './f01002.component.html',
  styleUrls: ['./f01002.component.css','../../assets/css/f01.css']
})
export class F01002Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[];

  queryVaultLedgerForm: FormGroup = this.fb.group({
    walletID: ['B-822', [Validators.maxLength(25)]],
    queryTxnID: ['', []],
    cvc: ['0901', [Validators.maxLength(4)]],
    transType: [],
    agencyID : ['B-822', []]
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
  constructor(private fb: FormBuilder, public f01002Service: F01002Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
    this.cvcCode.push({value: '0901', viewValue: '0901'});
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    '';
  }

  isFieldEmpty() {
    if(this.queryVaultLedgerForm.value.walletID == '' && this.queryVaultLedgerForm.value.queryTxnID == ''
      && this.queryVaultLedgerForm.value.cvc ==''
    ) {
      return true;
    }
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.queryVaultLedgerForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.queryVaultLedgerForm.value));
      await this.f01002Service.sendConsumer('consumer/f01002', formdata).then((data) => {
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
      const childernDialogRef = this.dialog.open(F01002confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F01002wopenComponent, {
      data: { walletID: this.queryVaultLedgerForm.value.walletid },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.queryVaultLedgerForm.patchValue({ queryTxnID: result.txnID });
        this.queryVaultLedgerForm.patchValue({ transType: result.valueTransType });
      }
    });
  }

  clear() {
    this.queryVaultLedgerForm.patchValue({
      walletID:'', queryTxnID:'', cvc:''
    });
  }
}
