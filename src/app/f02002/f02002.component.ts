import { TestBed } from '@angular/core/testing';
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
  styleUrls: ['./f02002.component.css']
})
export class F02002Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  //之後API取得下拉內容
  nationCode: COMB[] = [{value: 'TWN', viewValue: 'Taiwan'}, {value: 'JAN', viewValue: 'Japan'}, {value: 'USA', viewValue: 'USA'}];
  genderCode: COMB[] = [{value: 'M', viewValue: '男'}, {value: 'F', viewValue: '女'}];

  planModel: any = {start_time: new Date() };

  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    idNumber: ['', [Validators.required, Validators.maxLength(10)]],
    nation: ['TWN', [Validators.required, Validators.maxLength(3)]],
    gender: ['M', [Validators.required, Validators.maxLength(1)]],
    birthDate: ['', [Validators.required, Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(30)]],
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

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  // 參考範例: https://ej2.syncfusion.com/angular/documentation/datepicker/how-to/json-data-binding/
  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料必填喔!'
    } else {
      // 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.registrationForm.value.birthDate);
      jsonObj.birthDate = this.datePipe.transform(selectedDate,"yyyy-MM-dd");
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

  dateType: string;
  dateNums: string[] = ['單一日期', '區間日期'];

  testForm: FormGroup = this.fb.group({
    startTime: ['', [Validators.required, Validators.maxLength(10)]],
    endTime: ['0000', [Validators.maxLength(10)]]
  });
  test(){
    let startDate = new Date(this.testForm.value.startTime);
    let endDate = new Date();
    if ( this.testForm.value.endTime == '0000' ) {
      endDate = startDate;
    } else {
      endDate = new Date(this.testForm.value.endTime);
    }
    alert(this.datePipe.transform(startDate,"yyyy-MM-dd") + "," + this.datePipe.transform(endDate,"yyyy-MM-dd"));
  }
}



