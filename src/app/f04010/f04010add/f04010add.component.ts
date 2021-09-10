import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { F04010Service } from '../f04010.service';
import { F04010confirmComponent } from '../f04010confirm/f04010confirm.component';


@Component({
  templateUrl: './f04010add.component.html',
  styleUrls: ['./f04010add.component.css']
})
export class F04010addComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationShopForm: FormGroup = this.fb.group({
    enviroment: ['', [Validators.required]],
    redpacketAmount: ['', [Validators.required]],
    storeWalletId: ['', [Validators.required]],
    agencyWalletId: ['', [Validators.required]],
    serverKey: ['', [Validators.required]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f04010Service: F04010Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<F04010addComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationShopForm.get(cloumnName);

    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ;
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationShopForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      // this.registrationShopForm.patchValue( { walletId: this.data.walletId } );
      formdata.append('value', JSON.stringify(this.registrationShopForm.value));
      await this.f04010Service.sendConsumer('consumer/f04010add', formdata).then((data) => {
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
