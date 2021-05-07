import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03001Service } from '../f03001/f03001.service';
import { MatDialog } from '@angular/material/dialog';
import { F03002confirmComponent } from './f03002confirm/f03002confirm.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03002',
  templateUrl: './f03002.component.html',
  styleUrls: ['./f03002.component.css','../../assets/css/f03.css']
})
export class F03002Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  //之後API取得下拉內容
  cvcCode: COMB[] = [{value: '0901', viewValue: '0901'}, {value: '0901', viewValue: '0901'}];

  reverseForm: FormGroup = this.fb.group({
    walletid: ['', [Validators.maxLength(30)]],
    stxnid: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    remark: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, public f03001Service: F03001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.reverseForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' : "" ;
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.reverseForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.reverseForm.value));
      await this.f03001Service.sendConsumer('consumer/f03002', formdata).then((data) => {
        msg = data.statusCode + ':' + data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03002confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
