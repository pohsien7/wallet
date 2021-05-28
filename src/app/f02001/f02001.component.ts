import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02001Service } from './f02001.service';
import { F02001confirmComponent } from './f02001confirm/f02001confirm.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02001',
  templateUrl: './f02001.component.html',
  styleUrls: ['./f02001.component.css','../../assets/css/f02.css']
})
export class F02001Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  mccCode: COMB[] = [{value: 'C1234', viewValue: 'C1234'}, {value: 'C1234', viewValue: 'C1234'}];

  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    ban: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    owner: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    mcc: ['C1234', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    address: ['', [Validators.required,  Validators.maxLength(128)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02001Service: F02001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    if (cloumnName == 'ban' && this.f02001Service.checkBanIsValid(obj.value)) { obj.setErrors({'banError': true}); }
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' :
           obj.hasError('banError')  ? '統一編號格式錯誤' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      await this.f02001Service.sendConsumer('consumer/f02001', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02001confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }
}
