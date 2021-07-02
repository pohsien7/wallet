import { F03013Service } from './f03013.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { F03013confirmComponent } from './f03013confirm/f03013confirm.component';
import { F03013wopenComponent } from './f03013wopen/f03013wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03013',
  templateUrl: './f03013.component.html',
  styleUrls: ['./f03013.component.css','../../assets/css/f03.css']
})
export class F03013Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[];

  redeemCVForm: FormGroup = this.fb.group({
    walletID: [''],
    cvc: ['', [Validators.required, Validators.maxLength(4)]],
    amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    remark: ['*', [, Validators.maxLength(30)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f03013Service: F03013Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.redeemCVForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.redeemCVForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.redeemCVForm.value));
      this.f03013Service.sendConsumer('consumer/f03013', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.redeemCVForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03013confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03013wopenComponent, {
      //data: { walletId: this.reverseForm.value.recipientID },
      minHeight: '100vh',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.redeemCVForm.patchValue({ walletID : result.value });
        this.redeemCVForm.patchValue({ cvc : result.cvc });
      }
    });
  }
}
