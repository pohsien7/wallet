import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03006Service } from './f03006.service';
import { F03006confirmComponent } from './f03006confirm/f03006confirm.component';
import { F03006wopenComponent } from './f03006wopen/f03006wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03006',
  templateUrl: './f03006.component.html',
  styleUrls: ['./f03006.component.css','../../assets/css/f03.css']
})
export class F03006Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  payableNumberImage: string;

  cvcCode: COMB[] = [{value: '0901', viewValue: '0901'}, {value: '0901', viewValue: '0901'}];

  payableNumberForm: FormGroup = this.fb.group({
    walletID:['',[Validators.required, Validators.maxLength(23)]],
    cvc:['',[Validators.required ,Validators.maxLength(4)]],
    amount:['',[Validators.required, Validators.maxLength(18),Validators.pattern('^[0-9]+$')]],
    walletType:[]
  });

  resultForm: FormGroup = this.fb.group({
    payableNumber : ['', []]
  });

  constructor(private fb: FormBuilder, public f03006Service: F03006Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitted = false;

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.payableNumberForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('pattern') ? '請輸入數字' :"" ;
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.payableNumberForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.payableNumberForm.value));
      this.f03006Service.sendConsumer('consumer/f03006', formdata).then((data) => {
        msg = data.statusMessage;
        this.resultForm.patchValue({ payableNumber : data.payableNumber });
        this.payableNumberImage= 'data:image/jpeg;base64,' + data.payableNumberImage;
      });
      console.log(JSON.stringify(this.payableNumberForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03006confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03006wopenComponent, {
      data: { walletID: this.payableNumberForm.value.walletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.payableNumberForm.patchValue({ walletID : result.value });
        this.payableNumberForm.patchValue({ walletType: result.valueWalletType });
      }
    });
  }

  clear() {
    this.payableNumberForm.reset();
  }
}
