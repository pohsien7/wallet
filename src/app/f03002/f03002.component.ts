import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03001Service } from '../f03001/f03001.service';
import { MatDialog } from '@angular/material/dialog';
import { F03002confirmComponent } from './f03002confirm/f03002confirm.component';
import { F03002wopenComponent } from './f03002wopen/f03002wopen.component';
@Component({
  selector: 'app-f03002',
  templateUrl: './f03002.component.html',
  styleUrls: ['./f03002.component.css','../../assets/css/f03.css']
})

export class F03002Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  reverseForm: FormGroup = this.fb.group({
    walletid: ['', [Validators.maxLength(30)]],
    stxnid: ['', [Validators.required]],
    cvc: ['', [Validators.required]],
    remark: ['', []]
  })

  constructor(private fb: FormBuilder, public f03001Service: F03001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.reverseForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' : "" ;
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.reverseForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.reverseForm.value));
      await this.f03001Service.sendConsumer('consumer/f03002', formdata).then((data) => {
        msg = data.statusCode + ':' + data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03002confirmComponent, { data: { msgStr: msg } });
      this.reverseForm.patchValue({ walletid : '' });
      this.reverseForm.patchValue({ stxnid : '' });
      this.reverseForm.patchValue({ cvc : '' });
      this.reverseForm.patchValue({ remark : '' });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03002wopenComponent, {
      //data: { walletId: this.reverseForm.value.recipientID },
      minHeight: '100vh',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.reverseForm.patchValue({ walletid : result.recipientID });
        this.reverseForm.patchValue({ stxnid : result.txnID });
        this.reverseForm.patchValue({ cvc : result.cvc });
      }
    });
  }
}
