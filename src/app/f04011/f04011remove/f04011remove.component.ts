import { F04011Service } from '../f04011.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F04011confirmComponent } from '../f04011confirm/f04011confirm.component';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './f04011remove.component.html',
  styleUrls: ['./f04011remove.component.css']
})
export class F04011removeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationShopForm: FormGroup = this.fb.group({
    walletId: ['',[Validators.maxLength(40)]]

  });

  submitted = false;
  minDate:Date;

  constructor(private fb: FormBuilder,private datePipe: DatePipe, public f04011Service: F04011Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<F04011removeComponent>) {
    this.minDate = new Date();
   }

  ngOnInit(): void {
    console.log(this.data);

  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationShopForm.get(cloumnName);
    if (cloumnName == 'shopId' && this.f04011Service.checkBanIsValid(obj.value)) { obj.setErrors({'banError': true}); }
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('banError')  ? '統一編號格式錯誤' : '';
  }

  async onSubmit(){

    if(this.registrationShopForm.value.walletId == ''
    ){
      this.dialog.open(F04011confirmComponent, { data: { msgStr: '請選擇一項更新!' } });
      return;
    }

    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationShopForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      // this.registrationShopForm.patchValue( { cvc: this.data.cvc } );
      let jsonStr = JSON.stringify(this.registrationShopForm.value);
      let jsonObj = JSON.parse(jsonStr);


      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      await this.f04011Service.sendConsumer('consumer/f04011remove', formdata).then((data) => {
        msg = data.result;
        this.dialogRef.close();
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F04011confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
