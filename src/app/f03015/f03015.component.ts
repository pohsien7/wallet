import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01008confirmComponent } from '../f01008/f01008confirm/f01008confirm.component';
import { F03012wopenComponent } from '../f03012/f03012wopen/f03012wopen.component';
import { F03015Service } from './f03015.service';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03015',
  templateUrl: './f03015.component.html',
  styleUrls: ['./f03015.component.css','../../assets/css/f03.css']
})
export class F03015Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public f03015Service: F03015Service
  ) { }

  @BlockUI() blockUI: NgBlockUI;
  cvcCode: COMB[];
  submitted = false;

  returnCVForm: FormGroup = this.fb.group({
    walletID: [''],
    cvc: ['0901', [Validators.maxLength(4)]],
    amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    remark: ['*', [, Validators.maxLength(30)]]
  });


  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));
    this.cvcCode.push({value: '0901', viewValue: '0901'});
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
      this.f03015Service.sendConsumer('consumer/f03015', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.returnCVForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01008confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03012wopenComponent, {
      //data: { walletId: this.reverseForm.value.recipientID },
      minHeight: '100vh',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.returnCVForm.patchValue({ walletID : result.value });
      }
    });
  }
}
