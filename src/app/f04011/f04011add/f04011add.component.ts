import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { F04011Service } from '../f04011.service';
import { F04011confirmComponent } from '../f04011confirm/f04011confirm.component';


@Component({
  templateUrl: './f04011add.component.html',
  styleUrls: ['./f04011add.component.css']
})
export class F04011addComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  registrationShopForm: FormGroup = this.fb.group({
    walletid: ['', [Validators.required]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f04011Service: F04011Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<F04011addComponent>) { }

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
      await this.f04011Service.sendConsumer('consumer/f04011add', formdata).then((data) => {
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
