import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { F02002Service } from './f02002.service';

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
  nationCode: COMB[] = [{value: 'Tai', viewValue: 'Taiwan'}, {value: 'Jan', viewValue: 'Japan'}, {value: 'USA', viewValue: 'USA'}];
  genderCode: COMB[] = [{value: 'M', viewValue: 'Male'}, {value: 'F', viewValue: 'Female'}];

  planModel: any = {start_time: new Date() };

  date: string = '';

  dateChanged(evt) {
    let selectedDate = new Date(evt);
    console.log("by default:", selectedDate);
    console.log("by UTCString:", selectedDate.toUTCString());
    console.log("by LocaleString:", selectedDate.toLocaleString());
    console.log("by LocaleTimeString:", selectedDate.toLocaleTimeString());
    this.date = selectedDate.toUTCString.toString();
  }

  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    idNumber: ['', [Validators.required, Validators.maxLength(10)]],
    nation: ['tai', [Validators.required, Validators.maxLength(3)]],
    gender: ['m', [Validators.required, Validators.maxLength(1)]],
    birthDate: ['', [Validators.required, Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(30)]],
    address: ['', [Validators.required, Validators.maxLength(128)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02002Service: F02002Service) { }

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

  onSubmit() {
    this.submitted = true;
    console.log(FormGroup);
    this.registrationForm.patchValue({birthDate: this.date});
    if(!this.registrationForm.valid) {
      alert('資料必填喔!')
      return false;
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      this.f02002Service.sendConsumer('consumer/f02002', formdata).subscribe(data => {
        alert(data.status);
      });

      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}



