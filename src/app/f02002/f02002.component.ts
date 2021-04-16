import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { F02002Service } from './f02002.service';
import { DatePipe } from '@angular/common';

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
  dateStart = '1999-01-01';
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

  constructor(private fb: FormBuilder, public f02002Service: F02002Service, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  // 參考範例: https://ej2.syncfusion.com/angular/documentation/datepicker/how-to/json-data-binding/
  onSubmit() {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('資料必填喔!')
      return false;
    } else {
      // 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.registrationForm.value.birthDate);
      jsonObj.birthDate = this.datePipe.transform(selectedDate,"yyyy-MM-dd");
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02002Service.sendConsumer('consumer/f02002', formdata).then((data) => {
        alert(data.statusMessage);
      });
    }
  }
}



