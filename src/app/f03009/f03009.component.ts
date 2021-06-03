import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03009Service } from './f03009.service';
import { F03009confirmComponent } from './f03009confirm/f03009confirm.component';
import { F03009wopenComponent } from './f03009wopen/f03009wopen.component';

@Component({
  selector: 'app-f03009',
  templateUrl: './f03009.component.html',
  styleUrls: ['./f03009.component.css','../../assets/css/f03.css']
})
export class F03009Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    cvc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  });

  resultForm: FormGroup = this.fb.group({
    balance : ['', []],
    totalCount: ['', []],
    canBeDistributed: ['', []],
    canUse: ['', []],
    canAccept: ['', []],
    canRedeem: ['', []],
    lastModified: ['', []]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f03009Service: F03009Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      await this.f03009Service.sendConsumer('consumer/f03009', formdata).then((data) => {
        if (data.statusCode == "0000") {
          this.resultForm.patchValue({ balance : data.walletCVInfo.balance });
          this.resultForm.patchValue({ totalCount : data.walletCVInfo.totalCount });
          this.resultForm.patchValue({ canBeDistributed : data.walletCVInfo.canBeDistributed });
          this.resultForm.patchValue({ canUse : data.walletCVInfo.canUse });
          this.resultForm.patchValue({ canAccept : data.walletCVInfo.canAccept });
          this.resultForm.patchValue({ canRedeem : data.walletCVInfo.canRedeem });
          this.resultForm.patchValue({ lastModified : data.walletCVInfo.lastModified });
          this.resultForm.patchValue({ recipientBalance : data.walletCVInfo.recipientBalance });
          msg = data.statusMessage;
        } else {
          msg = data.statusMessage;
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03009confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03009wopenComponent, {
      data: { queryWalletID: this.registrationForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.registrationForm.patchValue({ queryWalletID : result.value });
        this.registrationForm.patchValue({ cvc : result.cvc });
      }
    });
  }

}
