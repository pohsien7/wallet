import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03012Service } from './f03012.service';
import { F03012confirmComponent } from './f03012confirm/f03012confirm.component';
import { F03012wopenComponent } from './f03012wopen/f03012wopen.component';
import { DatePipe } from '@angular/common';


interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03012',
  templateUrl: './f03012.component.html',
  styleUrls: ['./f03012.component.css','../../assets/css/f03.css']
})
export class F03012Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[];
  cvtypeCode: COMB[] = [{value: 'C', viewValue: '專用款'}, {value: 'V', viewValue: '數位券'}];
  minDate:Date;

  issueCVForm: FormGroup = this.fb.group({
    walletID: [''],
    cvc: ['', [Validators.required, Validators.maxLength(4)]],
    cvtype: ['', [Validators.required, Validators.maxLength(1)]],
    amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    redeemDeadline:['', [Validators.required]],
    remark: ['*', [, Validators.maxLength(30)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, public f03012Service: F03012Service, public dialog: MatDialog) { this.minDate = new Date(); }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.issueCVForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.issueCVForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      let jsonStr = JSON.stringify(this.issueCVForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.issueCVForm.value.redeemDeadline);
      jsonObj.redeemDeadline = this.datePipe.transform(selectedDate,"yyyy-MM-dd");
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f03012Service.sendConsumer('consumer/f03012', formdata).then((data) => {
        msg = data.statusMessage;
      });

    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03012wopenComponent, {
      //data: { walletId: this.reverseForm.value.recipientID },
      minHeight: '100vh',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.issueCVForm.patchValue({ walletID : result.value });
      }
    });
  }
}
