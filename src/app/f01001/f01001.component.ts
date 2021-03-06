import { F01001Service } from './f01001.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01001confirmComponent } from './f01001confirm/f01001confirm.component';
import { F01001wopenComponent } from './f01001wopen/f01001wopen.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001',
  templateUrl: './f01001.component.html',
  styleUrls: ['./f01001.component.css','../../assets/css/f01.css']
})
export class F01001Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[];

  transferForm: FormGroup = this.fb.group({
    vaultID: ['B-822', [Validators.maxLength(30)]],
    recipientid: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    amount: ['1', [Validators.required, Validators.maxLength(10)]],
    won: ['*', [Validators.required]],
    remark: ['*', [Validators.required]],
    walletType:[]
  });

  // checkForm: FormGroup = this.fb.group({
  //   recipientid: ['']
  // });

  model: number = this.transferForm.value.amount;
  submitted = false;

  constructor(private fb: FormBuilder, public f01001Service: F01001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
    this.cvcCode.push({value: '0901', viewValue: '0901'});
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.transferForm.get(cloumnName);
    // if ( cloumnName == 'recipientid' && this.transferForm.value.recipientid.length == 23 ) {
    //   this.checkForm.patchValue({ recipientid: this.transferForm.value.recipientid });
    //   let jsonStr = JSON.stringify(this.checkForm.value);
    //   let jsonObj = JSON.parse(jsonStr);
    //   const formdata: FormData = new FormData();
    //   formdata.append('value', JSON.stringify(jsonObj));
    //   this.f01001Service.sendConsumer('consumer/f01001CheckID', formdata).then((data) => {
    //     if ( data == null) {
    //       obj.setErrors({ 'WalletIDError': true })
    //     }
    //   });
    // }
    return obj.hasError('required') ? '??????????????????!' : obj.hasError('maxlength') ? '????????????' :
      obj.hasError('minlength') ? '????????????' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.transferForm.valid) {
      msg = '??????????????????????????????!'
    } else {
      if (this.transferForm.value.walletid == this.transferForm.value.recipientid) {
        msg = '??????ID????????????!'
      } else {
        const formdata: FormData = new FormData();
        this.transferForm.patchValue({ amount: parseInt(this.transform(this.transferForm.value.amount)) });
        formdata.append('value', JSON.stringify(this.transferForm.value));
        await this.f01001Service.sendConsumer('consumer/f01001', formdata).then((data) => {
          msg = data.statusMessage;
        });
      }
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01001confirmComponent, { data: { msgStr: msg } });
    }, 500);
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
    this.transferForm.reset();
  }

  getList() {
    const dialogRef = this.dialog.open(F01001wopenComponent, {
      data: { queryWalletID: this.transferForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.transferForm.patchValue({ recipientid : result.value });
        this.transferForm.patchValue({ walletType: result.valueWalletType });
      }
    });
  }
}
