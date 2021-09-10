import { F04010Service } from './../f04010.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F04010confirmComponent } from '../f04010confirm/f04010confirm.component';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './f04010edit.component.html',
  styleUrls: ['./f04010edit.component.css']
})
export class F04010EditComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationShopForm: FormGroup = this.fb.group({
    redpacketAmount: ['',[Validators.pattern('^[0-9]+$')]],
    storeWalletId:['', [Validators.maxLength(40)]],
    agencyWalletId: ['', [Validators.maxLength(40)]],
    serverKey:[''],
    enviroment:[this.data.id]

  });

  submitted = false;
  minDate:Date;

  constructor(private fb: FormBuilder,private datePipe: DatePipe, public f04010Service: F04010Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<F04010EditComponent>) {
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
    if (cloumnName == 'shopId' && this.f04010Service.checkBanIsValid(obj.value)) { obj.setErrors({'banError': true}); }
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('banError')  ? '統一編號格式錯誤' : '';
  }

  async onSubmit(){

    if(this.registrationShopForm.value.redpacketAmount == ''
      &&this.registrationShopForm.value.storeWalletId == ''
      &&this.registrationShopForm.value.agencyWalletId == ''
      &&this.registrationShopForm.value.enviroment == ''
      &&this.registrationShopForm.value.serverKey == ''

    ){
      this.dialog.open(F04010confirmComponent, { data: { msgStr: '請選擇一項更新!' } });
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
      await this.f04010Service.sendConsumer('consumer/f04010edit', formdata).then((data) => {
        msg = data.result;
        this.dialogRef.close();
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F04010confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
