import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02004Service } from './f02004.service';
import { F02004confirmComponent } from './f02004confirm/f02004confirm.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02004',
  templateUrl: './f02004.component.html',
  styleUrls: ['./f02004.component.css','../../assets/css/f02.css']
})
export class F02004Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  mccCode: COMB[] = [{value: 'MCC1', viewValue: 'MCC1'}, {value: 'MCC2', viewValue: 'MCC2'}];

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts

  registrationForm: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder, public f02004Service: F02004Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.registrationForm =
    this.fb.group({
      dn : new FormControl('' ,[
        Validators.maxLength(30)
      ]),
      phoneNumber : new FormControl('' ,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[0-9]+$')
      ]),
      balanceLimit: ['10000', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
      keyTxnLimit: ['3000', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]]
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' : '';
  }

  get dn() { return this.registrationForm.get('dn'); }
  get phoneNumber() { return this.registrationForm.get('phoneNumber'); }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else if ( parseInt(this.registrationForm.value.balanceLimit) <= parseInt(this.registrationForm.value.keyTxnLimit) ) {
      msg = '交易限額不可大於或等於餘額限額'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      this.f02004Service.sendConsumer('consumer/f02004', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.registrationForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02004confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }
}
