import { F02002confirmComponent } from './f02002confirm/f02002confirm.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { F02002Service } from './f02002.service';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02002',
  templateUrl: './f02002.component.html',
  styleUrls: ['./f02002.component.css', '../../assets/css/f02.css']
})
export class F02002Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  //之後API取得下拉內容
  nationCode: COMB[] = [{ value: 'TWN', viewValue: 'Taiwan' }, { value: 'JAN', viewValue: 'Japan' }, { value: 'USA', viewValue: 'USA' }];
  genderCode: COMB[] = [{ value: 'M', viewValue: '男' }, { value: 'F', viewValue: '女' }];

  planModel: any = { start_time: new Date() };

  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    idNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nation: ['', [Validators.required, Validators.maxLength(3)]],
    gender: ['', [Validators.required, Validators.maxLength(1)]],
    birthDate: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.maxLength(128)]]
  });
  submitted = false;

  constructor(private fb: FormBuilder, public f02002Service: F02002Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    if (cloumnName == 'idNumber' && this.f02002Service.checkIdNumberIsValid(obj.value)) { obj.setErrors({ 'idNumberError': true }); }
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern') ? '請輸入數字' :
        obj.hasError('idNumberError') ? '身分證格式錯誤' : '';
  }

  // 參考範例: https://ej2.syncfusion.com/angular/documentation/datepicker/how-to/json-data-binding/
  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.registrationForm.valid) {
      console.log("判斷格式="+this.registrationForm.value.nation+","+this.registrationForm.value.gender);
      msg = '資料格式有誤，請修正!'
    } else {
      // 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.registrationForm.value.birthDate);
      jsonObj.birthDate = this.datePipe.transform(selectedDate, "yyyy-MM-dd");
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02002Service.sendConsumer('consumer/f02002', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop();
      const childernDialogRef = this.dialog.open(F02002confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }

  testForm: FormGroup = this.fb.group({
    startTime: ['', [Validators.required, Validators.maxLength(10)]],
    endTime: ['', [Validators.maxLength(10)]]
  });

  setTimes() {
    if (this.testForm.value.endTime == null) {
      this.testForm.patchValue({ endTime: this.testForm.value.startTime });
      //this.testForm.setValue({endTime:this.testForm.value.startTime});
    }
  }

  // numberOnly(event: { which: any; keyCode: any; }): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }
}



