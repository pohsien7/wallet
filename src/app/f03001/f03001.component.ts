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
  styleUrls: ['./f03001.component.css', '../../assets/css/f03.css']
})
export class F03001Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }, { value: '0902', viewValue: '0902' }];

  transferForm: FormGroup = this.fb.group({
    walletid: ['B-822-2021051522253801', [Validators.maxLength(30)]],
    recipientid: ['B-822-1871533110902675', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    amount: ['1', [Validators.required, Validators.maxLength(10)]],
    won: ['*', [Validators.required]],
    remark: ['*', [Validators.required]]
  });
  model:number = this.transferForm.value.amount;
  submitted = false;

  constructor(private fb: FormBuilder, public f03001Service: F03001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
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
      const formdata: FormData = new FormData();
      this.transferForm.patchValue({ amount : parseInt(this.transform(this.transferForm.value.amount)) });
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

  clear(){
    this.transferForm.reset();
  }

}
