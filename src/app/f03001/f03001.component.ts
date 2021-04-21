import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03001Service } from './f03001.service';
import { F03001confirmComponent } from './f03001confirm/f03001confirm.component';

interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03001',
  templateUrl: './f03001.component.html',
  styleUrls: ['./f03001.component.css','../../assets/css/f03.css']
})
export class F03001Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{value: '0901', viewValue: '0901'}, {value: '0901', viewValue: '0901'}];

  transferForm: FormGroup = this.fb.group({
    walletid: ['', [Validators.maxLength(30)]],
    recipientid: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    amount: ['', [Validators.required]],
    won: ['', [Validators.required]],
    remark: ['', [Validators.required]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f03001Service: F03001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.transferForm.valid) {
      msg = '資料必填喔!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.transferForm.value));
      await this.f03001Service.sendConsumer('consumer/f03001', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03001confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
