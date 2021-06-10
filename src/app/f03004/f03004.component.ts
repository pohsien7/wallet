import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03004Service } from '../f03004/f03004.service';
import { MatDialog } from '@angular/material/dialog';
import { F03004confirmComponent } from './f03004confirm/f03004confirm.component';
import { F03004wopenComponent } from './f03004wopen/f03004wopen.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03004',
  templateUrl: './f03004.component.html',
  styleUrls: ['./f03004.component.css','../../assets/css/f03.css']
})
export class F03004Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  requestHmacForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(22), Validators.maxLength(23)]],
    walletType:[]
  })
  resultForm: FormGroup = this.fb.group({
    hmacKey : ['', []]
  });
  constructor(private fb: FormBuilder, public f03004Service: F03004Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;
  display = false;
  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.requestHmacForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' : "" ;
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.requestHmacForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.requestHmacForm.value));
      await this.f03004Service.sendConsumer('consumer/f03004', formdata).then((data) => {
        msg = data.statusMessage;
        this.resultForm.patchValue({ hmacKey : data.hmacKey });
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03004confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03004wopenComponent, {
      data: { queryWalletID: this.requestHmacForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.requestHmacForm.patchValue({ queryWalletID : result.value });
        this.requestHmacForm.patchValue({ walletType: result.valueWalletType });
      }
    });
  }

  check() {
    if (this.requestHmacForm.value.queryWalletID.length == 23) {
      this.f03004Service.get("JNNA", this.requestHmacForm.value.queryWalletID).then((data) => {
        if (data.IDerror == "error") {
          this.display = true;
        } else {
          this.display = false;
        }
      });
    }
  }
}
