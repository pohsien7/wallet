import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02013Service } from './f02013.service';
import { F02013confirmComponent } from './f02013confirm/f02013confirm.component';
import { F02013wopenComponent } from './f02013wopen/f02013wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02013',
  templateUrl: './f02013.component.html',
  styleUrls: ['./f02013.component.css','../../assets/css/f02.css']
})
export class F02013Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  updateWalletForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    dn: ['', [Validators.required, Validators.maxLength(30)]],
    remark: ['', [Validators.maxLength(128)]],
    userId: [''],
    walletType: ['']
  });
  submitted = false;

  constructor(private fb: FormBuilder, public f02013Service: F02013Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.updateWalletForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' :
           obj.hasError('idNumberError')  ? '身分證格式錯誤' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.updateWalletForm.valid) {
      msg = '資料必填喔!'
    } else {
      let jsonStr = JSON.stringify(this.updateWalletForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      await this.f02013Service.sendConsumer('consumer/f02013', formdata).then((data) => {
        msg = data.statusMessage;

      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02013confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02013wopenComponent, {
      data: { queryWalletID: this.updateWalletForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.updateWalletForm.patchValue({ queryWalletID : result.value });
        this.updateWalletForm.patchValue({ dn : result.name });
        this.updateWalletForm.patchValue({ remark : result.remark });
        this.updateWalletForm.patchValue({ userId : result.userId });
        this.updateWalletForm.patchValue({ walletType : result.walletType });

      }
    });
  }

}
