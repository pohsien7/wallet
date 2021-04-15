import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { F02003Service } from './f02003.service';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02003',
  templateUrl: './f02003.component.html',
  styleUrls: ['./f02003.component.css']
})
export class F02003Component implements OnInit {
  // 之後要改打API去取得下拉內容
  genderCode: COMB[] = [{value: 'G', viewValue: '女'}, {value: 'B', viewValue: '男'}];
  nationCode: COMB[] = [{value: 'TW', viewValue: 'Taiwan'}, {value: 'AU', viewValue: 'Australia'}];

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    idnumber: ['', [Validators.required, Validators.maxLength(10)]],
    nation: ['', [Validators.required, Validators.maxLength(3)]],
    gender: ['', [Validators.required, Validators.maxLength(1)]],
    birthday: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    phonenumber: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.maxLength(128)]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02003Service: F02003Service) { }

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
      this.f02003Service.sendConsumer('consumer/f02003', formdata).subscribe(data => {
        alert(data.status);
      });

      console.log(JSON.stringify(this.registrationForm.value));
    }
  }

}
