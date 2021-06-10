import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03006Service } from './f03006.service';
import { F03006confirmComponent } from './f03006confirm/f03006confirm.component';
import { F03006wopenComponent } from './f03006wopen/f03006wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03006',
  templateUrl: './f03006.component.html',
  styleUrls: ['./f03006.component.css', '../../assets/css/f03.css']
})
export class F03006Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  payableNumberImage: string;
  getPayablenumberForF02010: string;

  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }, { value: 'R001', viewValue: 'R001' }, { value: 'R002', viewValue: 'R002' }];

  payableNumberForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.required, Validators.maxLength(23)]],
    cvc: ['0901', [Validators.required, Validators.maxLength(4)]],
    amount: ['1', [Validators.required, Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    walletType: []
  });

  resultForm: FormGroup = this.fb.group({
    payableNumber: ['', []]
  });

  constructor(public dialogRef: MatDialogRef<F03006Component>, private fb: FormBuilder, public f03006Service: F03006Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getPayablenumberForF02010 = this.data.f02010;
  }

  submitted = false;
  display = false;
  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.payableNumberForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('pattern') ? '請輸入數字' : "";
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.payableNumberForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.payableNumberForm.value));
      this.f03006Service.sendConsumer('consumer/f03006', formdata).then((data) => {
        msg = data.statusMessage;
        this.resultForm.patchValue({ payableNumber: data.payableNumber });
        this.payableNumberImage = 'data:image/jpeg;base64,' + data.payableNumberImage;
        if (this.getPayablenumberForF02010 == "getPayablenumber") {
          msg = '支付條碼取得成功!'
          this.dialogRef.close({
            event: 'success',
            payableNumber: data.payableNumber,
            walletID: this.payableNumberForm.value.walletID,
            walletType: this.payableNumberForm.value.walletType
          });
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03006confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03006wopenComponent, {
      data: { walletID: this.payableNumberForm.value.walletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.payableNumberForm.patchValue({ walletID: result.value });
        this.payableNumberForm.patchValue({ walletType: result.valueWalletType });
      }
    });
    this.display = false;
  }

  clear() {
    this.payableNumberForm.reset();
  }

  check() {
    if (this.payableNumberForm.value.walletID.length == 23) {
      this.f03006Service.get("JNNA", this.payableNumberForm.value.walletID).then((data) => {
        if (data.IDerror == "error") {
          this.display = true;
        } else {
          this.display = false;
        }
      });
    }
  }
}
