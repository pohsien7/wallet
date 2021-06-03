import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02012Service } from './f02012.service';
import { F02012confirmComponent } from './f02012confirm/f02012confirm.component';
import { F02012wopenComponent } from './f02012wopen/f02012wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02012',
  templateUrl: './f02012.component.html',
  styleUrls: ['./f02012.component.css','../../assets/css/f02.css']
})
export class F02012Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // 之後要改打API去取得下拉內容
  canBeDistributedCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];
  canUseCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];
  canAcceptCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];
  canRedeemCode: COMB[] = [{ value: 'true', viewValue: '是' }, { value: 'false', viewValue: '否' }];

  updateCVForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    cvc: ['', [Validators.required, Validators.maxLength(100)]],
    canBeDistributed: ['', [Validators.required, Validators.maxLength(10)]],
    canUse: ['', [Validators.required, Validators.maxLength(50)]],
    canAccept: ['', [Validators.required, Validators.maxLength(30)]],
    canRedeem: ['', [Validators.required, Validators.maxLength(5)]],
    remark: ['', [Validators.maxLength(128)]]
  });
  submitted = false;

  constructor(private fb: FormBuilder, public f02012Service: F02012Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.updateCVForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' :
           obj.hasError('idNumberError')  ? '身分證格式錯誤' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.updateCVForm.valid) {
      msg = '資料必填喔!'
    } else {
      let jsonStr = JSON.stringify(this.updateCVForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      // formdata.append('value', JSON.stringify(this.upgradeWalletForm.value));
      await this.f02012Service.sendConsumer('consumer/f02012', formdata).then((data) => {
        msg = data.statusMessage;

      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02012confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02012wopenComponent, {
      data: { queryWalletID: this.updateCVForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.updateCVForm.patchValue({ queryWalletID : result.value });
        this.updateCVForm.patchValue({ cvc : result.cvc });
        this.updateCVForm.patchValue({ canBeDistributed : result.canBeDistributed });
        this.updateCVForm.patchValue({ canUse : result.canUse });
        this.updateCVForm.patchValue({ canAccept : result.canAccept });
        this.updateCVForm.patchValue({ canRedeem : result.canRedeem });
        this.updateCVForm.patchValue({ remark : result.remark });
      }
    });
  }

}
