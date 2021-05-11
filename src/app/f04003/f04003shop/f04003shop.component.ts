import { F04003Service } from './../f04003.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F04003confirmComponent } from '../f04003confirm/f04003confirm.component';

@Component({
  selector: 'app-f04003shop',
  templateUrl: './f04003shop.component.html',
  styleUrls: ['./f04003shop.component.css', '../../../assets/css/f04.css']
})
export class F04003shopComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  registrationShopForm: FormGroup = this.fb.group({
    walletId: [''],
    shopId: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    shopName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f04003Service: F04003Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<F04003shopComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationShopForm.get(cloumnName);
    if (cloumnName == 'shopId' && this.f04003Service.checkBanIsValid(obj.value)) { obj.setErrors({'banError': true}); }
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
      const formdata: FormData = new FormData();
      this.registrationShopForm.patchValue( { walletId: this.data.walletId } );
      formdata.append('value', JSON.stringify(this.registrationShopForm.value));
      await this.f04003Service.sendConsumer('consumer/f04003Shop', formdata).then((data) => {
        msg = data.result;
        this.dialogRef.close();
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F04003confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
