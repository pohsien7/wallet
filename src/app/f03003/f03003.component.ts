import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03003Service } from './f03003.service';
import { F03003confirmComponent } from './f03003confirm/f03003confirm.component';

@Component({
  selector: 'app-f03003',
  templateUrl: './f03003.component.html',
  styleUrls: ['./f03003.component.css','../../assets/css/f03.css']
})
export class F03003Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  authorizaionForm: FormGroup = this.fb.group({
    authID:['',[Validators.required, Validators.maxLength(30)]],
    operation:['',[Validators.required ,Validators.maxLength(30)]],
    walletID:['',[Validators.required, Validators.maxLength(22)]],
    recipientID:['',[Validators.required, Validators.maxLength(22)]],
    remark:['',[Validators.required, Validators.maxLength(30)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f03003Service: F03003Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.authorizaionForm.patchValue({walletID : this.data.walletId});
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.authorizaionForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : '';
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if ( !this.authorizaionForm.valid ) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.authorizaionForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f03003Service.sendConsumer('consumer/f03003', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03003confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}