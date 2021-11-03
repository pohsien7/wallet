import { F01008Service } from './f01008.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { F01008confirmComponent } from './f01008confirm/f01008confirm.component';
import { F01008wopenComponent } from './f01008wopen/f01008wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01008',
  templateUrl: './f01008.component.html',
  styleUrls: ['./f01008.component.css','../../assets/css/f03.css']
})
export class F01008Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[];

  redeemCVForm: FormGroup = this.fb.group({
    vaultID: ['B-822'],
    amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    remark: ['*', [, Validators.maxLength(30)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f01008Service: F01008Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.redeemCVForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.redeemCVForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.redeemCVForm.value));
      this.f01008Service.sendConsumer('consumer/f01008', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.redeemCVForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01008confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
