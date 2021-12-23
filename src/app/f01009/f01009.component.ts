import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01008confirmComponent } from '../f01008/f01008confirm/f01008confirm.component';
import { F01009Service } from './f01009.service';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01009',
  templateUrl: './f01009.component.html',
  styleUrls: ['./f01009.component.css','../../assets/css/f03.css']
})
export class F01009Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public f01009Service: F01009Service
  ) { }

  @BlockUI() blockUI: NgBlockUI;
  cvcCode: COMB[];
  submitted = false;

  returnCVForm: FormGroup = this.fb.group({
    vaultID: ['B-822'],
    cvc: ['R001', [Validators.maxLength(4)]],
    amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    remark: ['*', [, Validators.maxLength(30)]]
  });

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.returnCVForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.returnCVForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.returnCVForm.value));
      this.f01009Service.sendConsumer('consumer/f01009', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.returnCVForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01008confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
