import { F04006Service } from './../f04006.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F04006confirmComponent } from '../f04006confirm/f04006confirm.component';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './f04006shop.component.html',
  styleUrls: ['./f04006shop.component.css']
})
export class F04006shopComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationShopForm: FormGroup = this.fb.group({
    cvc: [''],
    deadlineDate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]

  });

  submitted = false;
  minDate:Date;

  constructor(private fb: FormBuilder,private datePipe: DatePipe, public f04006Service: F04006Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<F04006shopComponent>) {
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
    if (cloumnName == 'shopId' && this.f04006Service.checkBanIsValid(obj.value)) { obj.setErrors({'banError': true}); }
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('banError')  ? '統一編號格式錯誤' : '';
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationShopForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      this.registrationShopForm.patchValue( { cvc: this.data.cvc } );
      let jsonStr = JSON.stringify(this.registrationShopForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.registrationShopForm.value.deadlineDate);
      jsonObj.deadlineDate = this.datePipe.transform(selectedDate,"yyyy-MM-dd");


      const formdata: FormData = new FormData();


      formdata.append('value', JSON.stringify(jsonObj));
      await this.f04006Service.sendConsumer('consumer/f04006Shop', formdata).then((data) => {
        msg = data.result;
        this.dialogRef.close();
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F04006confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
