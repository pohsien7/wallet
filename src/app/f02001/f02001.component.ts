import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { F02001Service } from './f02001.service';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02001',
  templateUrl: './f02001.component.html',
  styleUrls: ['./f02001.component.css']
})
export class F02001Component implements OnInit {
  // 之後要改打API去取得下拉內容
  mccCode: COMB[] = [{value: 'MCC1', viewValue: 'MCC1'}, {value: 'MCC2', viewValue: 'MCC2'}];

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    ban: ['', [Validators.required, Validators.maxLength(10)]],
    owner: ['', [Validators.required, Validators.maxLength(50)]],
    phonenumber: ['', [Validators.required, Validators.maxLength(30)]],
    mcc: ['MCC1', [Validators.required, Validators.maxLength(5)]],
    address: ['', [Validators.required, Validators.maxLength(128)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02001Service: F02001Service) { }

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
    if(!this.registrationForm.valid) {
      alert('資料必填喔!')
      return false;
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      this.f02001Service.sendConsumer('consumer/f02001', formdata).subscribe(data => {
        alert(data.status);
      });

      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}
