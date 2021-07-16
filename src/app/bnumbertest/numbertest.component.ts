import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NumbertestService } from '../bnumbertest/numbertest.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumbertestConfirmComponent } from './numbertestconfirm/numbertestconfirm.component';
import { NumbertestwopenComponent } from './numbertestwopen/numbertestwopen.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03005',
  templateUrl: './numbertest.component.html',
  styleUrls: ['./numbertest.component.css','../../assets/css/f03.css']
})
export class NumbertestComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  number: string;
  verify: string;
  response: string;
  getBarcodeForF02009: string;

  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' },{ value: 'R001', viewValue: 'R001' },{ value: 'R002', viewValue: 'R002' } ];

  walletItCode: COMB[] = [{ value: 'BW-822-2021061010423247', viewValue: '測試付款者-BW-822-2021061010423247' } ];



  generateBarcodeForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    cvc: ['0901', [Validators.required]],
    amount:['', [Validators.required]]
  })
  resultForm: FormGroup = this.fb.group({
    number : ['', []],
    verify : ['', []],
    response:['']

  });
  constructor(public dialogRef: MatDialogRef<NumbertestComponent>, private fb: FormBuilder, public numbertestService: NumbertestService, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getBarcodeForF02009 =  this.data.f02009;
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.generateBarcodeForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' : "" ;
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.generateBarcodeForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.generateBarcodeForm.value));
      await this.numbertestService.sendConsumer('numbertest', formdata).then((data) => {
        msg = data.statusMessage;
        console.log(data);
        this.resultForm.patchValue({ number : data.number });
        this.resultForm.patchValue({ verify : data.verify });
        this.resultForm.patchValue({ response : data.response });

        // if (this.getBarcodeForF02009 == "getBarcode") {
        //   msg = '支付條碼取得成功!'
        //   this.dialogRef.close({ event:'success',barcode: data.barcode });
        // }
      });
    }
    // setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      // const childernDialogRef = this.dialog.open(BarcodetestConfirmComponent, { data: { msgStr: msg } });
    // }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(NumbertestwopenComponent, {
      data: { queryWalletID: this.generateBarcodeForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.generateBarcodeForm.patchValue({ queryWalletID : result.value });
        this.generateBarcodeForm.patchValue({ walletType: result.valueWalletType });
      }
    });
  }

  clear() {
    this.generateBarcodeForm.reset();
  }
}
