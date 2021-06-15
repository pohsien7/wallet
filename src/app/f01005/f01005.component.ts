import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01005Service } from './f01005.service';
import { F01005confirmComponent } from './f01005confirm/f01005confirm.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01005',
  templateUrl: './f01005.component.html',
  styleUrls: ['./f01005.component.css','../../assets/css/f01.css']
})
export class F01005Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[] = [{ value: '0901', viewValue: '數位貨幣' }, { value: 'R001', viewValue: '專用款' }, { value: 'R002', viewValue: '數位券' }];
  
  queryVaultLedgerSNForm: FormGroup = this.fb.group({
    vaultID: ['B-822', [Validators.maxLength(25)]],
    querySN: ['', [Validators.required,Validators.pattern('^[0-9]+$')]],
    cvc: ['0901', [Validators.maxLength(4)]],
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
  constructor(private fb: FormBuilder, public f01005Service: F01005Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : this.formControl.hasError('pattern')   ? '請輸入數字':
    '';
  }

  isFieldEmpty() {
    if(this.queryVaultLedgerSNForm.value.vaultID == '' && this.queryVaultLedgerSNForm.value.querySN == ''
      && this.queryVaultLedgerSNForm.value.cvc ==''
    ) {
      return true;
    }
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.queryVaultLedgerSNForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else if ( this.queryVaultLedgerSNForm.value.querySN == 0 || this.queryVaultLedgerSNForm.value.querySN < 0) {
      msg = '交易序號需大於0!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.queryVaultLedgerSNForm.value));
      await this.f01005Service.sendConsumer('consumer/f01005', formdata).then((data) => {
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
      const childernDialogRef = this.dialog.open(F01005confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  clear() {
    this.queryVaultLedgerSNForm.patchValue({
      vaultID:'', querySN:'', cvc:''
    });
  }

}
