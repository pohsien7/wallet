import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02003Service } from './f02003.service';
import { F02003confirmComponent } from './f02003confirm/f02003confirm.component';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02003',
  templateUrl: './f02003.component.html',
  styleUrls: ['./f02003.component.css','../../assets/css/f02.css']
})
export class F02003Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    idNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nation: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birthDate: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.maxLength(128)]]
  });

  gender: string;
  nation: string;

  submitted = false;

  constructor(private fb: FormBuilder, public f02003Service: F02003Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNation();
    this.getGender();
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    if (cloumnName == 'idNumber' && this.f02003Service.checkIdNumberIsValid(obj.value)) { obj.setErrors({'idNumberError': true}); }
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' :
           obj.hasError('idNumberError')  ? '身分證格式錯誤' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.registrationForm.value.birthDate);
      jsonObj.birthDate = this.datePipe.transform(selectedDate,"yyyy-MM-dd");
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02003Service.sendConsumer('consumer/f02003', formdata).then((data) => {
        msg = data.statusMessage;
      });
      console.log(JSON.stringify(this.registrationForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02003confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  getGender() {
    const formdata: FormData = new FormData();
    this.f02003Service.sendConsumer('consumer/f02003/getGender', formdata).then((data) => {
      this.gender = data.gender;
    });
  }
  getNation() {
    const formdata: FormData = new FormData();
    this.f02003Service.sendConsumer('consumer/f02003/getNation', formdata).then((data) => {
      this.nation = data.nation;
    });
  }

}
