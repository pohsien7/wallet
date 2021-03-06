import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03001Service } from './f03001.service';
import { F03001confirmComponent } from './f03001confirm/f03001confirm.component';
import { F03001wopenComponent } from './f03001wopen/f03001wopen.component';

interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03001',
  templateUrl: './f03001.component.html',
  styleUrls: ['./f03001.component.css', '../../assets/css/f03.css']
})
export class F03001Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  cvcCode: COMB[];

  transferForm: FormGroup = this.fb.group({
    walletid: ['', [Validators.maxLength(30)]],
    recipientid: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    amount: ['1', [Validators.required, Validators.maxLength(10)]],
    won: ['*', [Validators.required]],
    remark: ['*', [Validators.required]],
    walletType:[]
  });
  model: number = this.transferForm.value.amount;
  submitted = false;

  constructor(private fb: FormBuilder, public f03001Service: F03001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
    this.cvcCode.push({value: '0901', viewValue: '0901'});
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.transferForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.transferForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      if (this.transferForm.value.walletid == this.transferForm.value.recipientid) {
        msg = '錢包ID不可重複!'
      } else {
        const formdata: FormData = new FormData();
        this.transferForm.patchValue({ amount: parseInt(this.transform(this.transferForm.value.amount)) });
        formdata.append('value', JSON.stringify(this.transferForm.value));
        await this.f03001Service.sendConsumer('consumer/f03001', formdata).then((data) => {
          msg = data.statusMessage;
        });
      }
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03001confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  transform(value: string) {
    return value && value.toString().replace(/,/g, '') || '';
  }

  clear() {
    this.transferForm.reset();
  }

  getList(id: string) {
    if (id == 'walletid') {
      const dialogRef = this.dialog.open(F03001wopenComponent, {
        data: { walletID: this.transferForm.value.walletid },
        minHeight: '100vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') {
          this.transferForm.patchValue({ walletid: result.value });
          this.transferForm.patchValue({ walletType: result.valueWalletType });
        }
      });
    } else {
      const dialogRef = this.dialog.open(F03001wopenComponent, {
        data: { walletID: this.transferForm.value.recipientid },
        minHeight: '100vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') {
          this.transferForm.patchValue({ recipientid: result.value });
        }
      });
    }
  }

}
