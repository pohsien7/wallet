import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01006Service } from './f01006.service';
import { F01006confirmComponent } from './f01006confirm/f01006confirm.component';
interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01006',
  templateUrl: './f01006.component.html',
  styleUrls: ['./f01006.component.css', '../../assets/css/f01.css']
})
export class F01006Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[];

  queryVaultCVInfoForm: FormGroup = this.fb.group({
    vaultID: ['B-822', [Validators.maxLength(25)]],
    cvc: ['R001', [Validators.maxLength(4)]],
  });

  resultForm: FormGroup = this.fb.group({
    vaultID : ['', []],
    cvc: ['', []],
    balance: ['', []],
    totalCount: ['', []],
    lastModified: ['', []]
  });

  submitted = false;
  constructor(private fb: FormBuilder, public f01006Service: F01006Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : this.formControl.hasError('pattern')   ? '請輸入數字':
    '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.queryVaultCVInfoForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.queryVaultCVInfoForm.value));
      await this.f01006Service.sendConsumer('consumer/f01006', formdata).then((data) => {
        if (data.statusCode == "0000") {
          this.resultForm.patchValue({ vaultID : data.vaultCVInfo.vaultID });
          this.resultForm.patchValue({ cvc : data.vaultCVInfo.cvc });
          this.resultForm.patchValue({ balance : data.vaultCVInfo.balance });
          this.resultForm.patchValue({ totalCount : data.vaultCVInfo.totalCount });
          this.resultForm.patchValue({ lastModified : data.vaultCVInfo.lastModified });
          msg = data.statusMessage;
        } else {
          msg = data.statusMessage;
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01006confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  clear() {
    this.queryVaultCVInfoForm.patchValue({
      vaultID:'', cvc:''
    });
  }

}
