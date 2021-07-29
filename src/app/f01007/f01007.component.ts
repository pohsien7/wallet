import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01007Service } from './f01007.service';
import { F01007confirmComponent } from './f01007confirm/f01007confirm.component';
import { F01007wopenComponent } from './f01007wopen/f01007wopen.component';

interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01007',
  templateUrl: './f01007.component.html',
  styleUrls: ['./f01007.component.css', '../../assets/css/f03.css']
})
export class F01007Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 之後要改打API去取得下拉內容
  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }];

  deductForm: FormGroup = this.fb.group({
    authID: ['', [Validators.required, Validators.maxLength(30)]],
    operation: ['withdraw', [Validators.required, Validators.maxLength(30)]],
    senderID: ['', [Validators.required, Validators.maxLength(23)]],
    recipientID: ['', [Validators.required, Validators.maxLength(23)]],

    amount: ['1', [Validators.required, Validators.maxLength(18)]],
    won: ['*', [Validators.required]],
    remark: ['*', [Validators.required]]
  });
  model: number = this.deductForm.value.amount;
  submitted = false;

  constructor(private fb: FormBuilder, public f01007Service: F01007Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.deductForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.deductForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
        const formdata: FormData = new FormData();
        this.deductForm.patchValue({ amount: parseInt(this.transform(this.deductForm.value.amount)) });
        formdata.append('value', JSON.stringify(this.deductForm.value));
        await this.f01007Service.sendConsumer('consumer/f01007', formdata).then((data) => {
          msg = data.statusMessage;
        });
    }

    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01007confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  transform(value: string) {
    return value && value.toString().replace(/,/g, '') || '';
  }

  clear() {
    this.deductForm.reset();
  }

  getList() {
      const dialogRef = this.dialog.open(F01007wopenComponent, {
        data: { walletID: this.deductForm.value.walletID },
        minHeight: '100vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') {
          this.deductForm.patchValue({ authID: result.value });
          this.deductForm.patchValue({ senderID: result.senderID });
          this.deductForm.patchValue({ recipientID: result.recipientID });
        }
      });
  }

}
