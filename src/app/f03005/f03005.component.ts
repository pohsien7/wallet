import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03005Service } from '../f03005/f03005.service';
import { MatDialog } from '@angular/material/dialog';
import { F03005confirmComponent } from './f03005confirm/f03005confirm.component';
import { F03005wopenComponent } from './f03005wopen/f03005wopen.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03005',
  templateUrl: './f03005.component.html',
  styleUrls: ['./f03005.component.css','../../assets/css/f03.css']
})
export class F03005Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  
  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }, { value: '0902', viewValue: '0902' }];

  requestHmacForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(22), Validators.maxLength(23)]],
    cvc: ['0901', [Validators.required]],
  })
  resultForm: FormGroup = this.fb.group({
    hmacKey : ['', []]
  });
  constructor(private fb: FormBuilder, public f03005Service: F03005Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.requestHmacForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' : "" ;
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.requestHmacForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.requestHmacForm.value));
      await this.f03005Service.sendConsumer('consumer/f03005', formdata).then((data) => {
        msg = data.statusMessage;
        this.resultForm.patchValue({ barcode : data.barcode });
        this.resultForm.patchValue({ expireTime : data.expireTime });
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03005confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03005wopenComponent, {
      data: { queryWalletID: this.requestHmacForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.requestHmacForm.patchValue({ queryWalletID : result.value });
      }
    });
  }
}