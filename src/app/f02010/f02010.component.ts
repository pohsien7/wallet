import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02010Service } from '../f02010/f02010.service';
import { MatDialog } from '@angular/material/dialog';
import { F02010confirmComponent } from './f02010confirm/f02010confirm.component';
import { F02010wopenComponent } from './f02010wopen/f02010wopen.component';
import { F03006Component } from '../f03006/f03006.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02010',
  templateUrl: './f02010.component.html',
  styleUrls: ['./f02010.component.css','../../assets/css/f02.css']
})
export class F02010Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' },{ value: 'R001', viewValue: 'R001' },{ value: 'R002', viewValue: 'R002' }];
  channelCode: COMB[] = [{ value: 'A001', viewValue: 'ATM提款' },
                         { value: 'M001', viewValue: '實體消費' },
                         { value: 'N001', viewValue: '網路消費' },
                         { value: 'N002', viewValue: '網路繳費' },
                         { value: 'N003', viewValue: '網路繳稅' } ];

  numberPayForm: FormGroup = this.fb.group({
    recipientID: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    amount: ['1', [Validators.required]],
    channelcode: ['A001', [Validators.required]],
    payablenumber: ['', [Validators.required]],
    won: ['*'],
    remark: [''],
    walletID: [''],
    walletType: ['']
  })

  display = false;
  constructor(private fb: FormBuilder, public f02010Service: F02010Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.numberPayForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.numberPayForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.numberPayForm.value));
      await this.f02010Service.sendConsumer('consumer/f02010', formdata).then((data) => {
        msg = data.statusMessage;

      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02010confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02010wopenComponent, {
      data: { recipientID: this.numberPayForm.value.recipientID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.numberPayForm.patchValue({ recipientID : result.value });
      }
    });
  }

  getPayablenumber() {
    const dialogRef = this.dialog.open(F03006Component, {
      data: { f02010 : "getPayablenumber" },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.numberPayForm.patchValue({ payablenumber : result.payableNumber });
        this.numberPayForm.patchValue({ amount : result.amount });
        this.numberPayForm.patchValue({ cvc : result.cvc });

        this.numberPayForm.patchValue({ walletID : result.walletID });
        this.numberPayForm.patchValue({ walletType : result.walletType });
      }
    });
  }

  check() {
    if (this.numberPayForm.value.recipientID.length == 23) {
      this.f02010Service.get("N", this.numberPayForm.value.recipientID).then((data) => {
        if (data.IDerror == "error") {
          this.display = true;
        } else {
          this.display = false;
        }
      });
    }
  }
}
