import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02009Service } from './f02009.service';
import { F02009confirmComponent } from './f02009confirm/f02009confirm.component';
import { F02009wopenComponent } from './f02009wopen/f02009wopen.component';

@Component({
  selector: 'app-f02009',
  templateUrl: './f02009.component.html',
  styleUrls: ['./f02009.component.css','../../assets/css/f02.css']
})
export class F02009Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  barcodePayForm: FormGroup = this.fb.group({
    recipientID:['',[Validators.required, Validators.maxLength(23)]],
    amount:['',[Validators.required, Validators.maxLength(18),Validators.pattern('^[0-9]+$')]],
    barcode:['',[Validators.required, Validators.maxLength(40)]],
    won:[''],
    remark:['']

  });

  constructor(private fb: FormBuilder, public f02009Service: F02009Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.barcodePayForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('pattern') ? '請輸入數字' :"" ;
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.barcodePayForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.barcodePayForm.value));
      this.f02009Service.sendConsumer('consumer/f02009', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.barcodePayForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02009confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02009wopenComponent, {
      data: { walletId: this.barcodePayForm.value.recipientID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.barcodePayForm.patchValue({ recipientID : result.value });
      }
    });
  }

}
