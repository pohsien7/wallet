import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { F02004Service } from './f02004.service';

interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02004',
  templateUrl: './f02004.component.html',
  styleUrls: ['./f02004.component.css']
})
export class F02004Component implements OnInit {
  // 之後要改打API去取得下拉內容
  mccCode: COMB[] = [{value: 'MCC1', viewValue: 'MCC1'}, {value: 'MCC2', viewValue: 'MCC2'}];

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts

  registrationForm: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder, public f02004Service: F02004Service) { }

  ngOnInit(): void {
    this.registrationForm =
    this.fb.group({
      dn : new FormControl('' ,[
        Validators.required


      ]),
      phoneNumber : new FormControl('' ,[
        Validators.required,
        Validators.minLength(10)
      ])

    });
  }

  // getErrorMessage() {
  //     console.log(this.registrationForm.getError('dn'));
  //   return this.registrationForm.hasError('required') ? 'Required field' :
  //   this.registrationForm.hasError('minlength') ? '太短' :
  //   '';
  // }

  get dn() { return this.registrationForm.get('dn'); }
  get phoneNumber() { return this.registrationForm.get('phoneNumber'); }

  onSubmit() {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('資料有誤!')
      return false;
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.registrationForm.value));
      this.f02004Service.sendConsumer('consumer/f02004', formdata).then((data) => {
        alert(data.statusMessage);
      });

      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}
