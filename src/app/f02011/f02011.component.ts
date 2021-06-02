import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02011Service } from './f02011.service';
import { F02011confirmComponent } from './f02011confirm/f02011confirm.component';
import { F02011wopenComponent } from './f02011wopen/f02011wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02011',
  templateUrl: './f02011.component.html',
  styleUrls: ['./f02011.component.css','../../assets/css/f02.css']
})
export class F02011Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{ value: 'R001', viewValue: 'R001' }, { value: 'R002', viewValue: 'R002' }];
  canBeDistributedCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];
  canUseCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];
  canAcceptCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];
  canRedeemCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];

  activateCVForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    cvc: ['', [Validators.required, Validators.maxLength(100)]],
    canBeDistributed: ['', [Validators.required, Validators.maxLength(10)]],
    canUse: ['', [Validators.required, Validators.maxLength(50)]],
    canAccept: ['', [Validators.required, Validators.maxLength(30)]],
    canRedeem: ['', [Validators.required, Validators.maxLength(5)]],
    remark: ['', [Validators.maxLength(128)]],
    userId: [''],
    walletType: ['']
  });
  submitted = false;

  constructor(private fb: FormBuilder, public f02011Service: F02011Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.activateCVForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' :
           obj.hasError('idNumberError')  ? '身分證格式錯誤' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.activateCVForm.valid) {
      msg = '資料必填喔!'
    } else {
      let jsonStr = JSON.stringify(this.activateCVForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      // formdata.append('value', JSON.stringify(this.upgradeWalletForm.value));
      await this.f02011Service.sendConsumer('consumer/f02011', formdata).then((data) => {
        msg = data.statusMessage;

      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02011confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02011wopenComponent, {
      data: { queryWalletID: this.activateCVForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.activateCVForm.patchValue({ queryWalletID : result.value });
        this.activateCVForm.patchValue({ dn : result.name });
        this.activateCVForm.patchValue({ userId : result.userId });
        this.activateCVForm.patchValue({ walletType : result.walletType });

      }
    });
  }

}
