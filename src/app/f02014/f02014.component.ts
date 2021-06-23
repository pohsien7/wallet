import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02014Service } from './f02014.service';
import { F02014confirmComponent } from './f02014confirm/f02014confirm.component';
import { F02014wopenComponent } from './f02014wopen/f02014wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f02014',
  templateUrl: './f02014.component.html',
  styleUrls: ['./f02014.component.css', '../../assets/css/f02.css']
})
export class F02014Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  nationCode: COMB[] = [{ value: 'TWN', viewValue: 'Taiwan' }, { value: 'JAN', viewValue: 'Japan' }, { value: 'USA', viewValue: 'USA' }];
  genderCode: COMB[] = [{ value: 'M', viewValue: '男' }, { value: 'F', viewValue: '女' }];

  planModel: any = { start_time: new Date() };

  updateForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    walletType: [''],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    idNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nation: ['', [Validators.required, Validators.maxLength(3)]],
    gender: ['', [Validators.required, Validators.maxLength(1)]],
    birthDate: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.maxLength(128)]],
    remark: ['*', [, Validators.maxLength(30)]]
  });
  submitted = false;
  display = false;
  constructor(private fb: FormBuilder, public f02014Service: F02014Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.updateForm.get(cloumnName);
    if (cloumnName == 'idNumber' && this.f02014Service.checkIdNumberIsValid(obj.value)) { obj.setErrors({ 'idNumberError': true }); }
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern') ? '請輸入數字' :
        obj.hasError('idNumberError') ? '身分證格式錯誤' : '';
  }

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.updateForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      // 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let jsonStr = JSON.stringify(this.updateForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.updateForm.value.birthDate);
      jsonObj.birthDate = this.datePipe.transform(selectedDate, "yyyy-MM-dd");
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02014Service.sendConsumer('consumer/f02014', formdata).then((data) => {
        if (data.statusMessage == 'E9999-系統異常！') {
          msg = '無資料';
        } else {
          msg = data.statusMessage;
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop();
      const childernDialogRef = this.dialog.open(F02014confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02014wopenComponent, {
      data: { walletID: this.updateForm.value.walletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.updateForm.patchValue({ walletID : result.walletID });
        this.updateForm.patchValue({ walletType : result.walletType });
        this.updateForm.patchValue({ name : result.name });
        this.updateForm.patchValue({ idNumber : result.idNumber });
        this.updateForm.patchValue({ nation : result.nation });
        this.updateForm.patchValue({ gender : result.gender });
        this.updateForm.patchValue({ birthDate : result.birthDate });
        this.updateForm.patchValue({ phoneNumber : result.phoneNumber });
        this.updateForm.patchValue({ address : result.address });
      }
    });
  }

  get() {
    if (this.updateForm.value.walletID.length == 23) {
      this.f02014Service.get("NN", this.updateForm.value.walletID).then((data) => {
        if (data.IDerror == "error") {
          this.display = true;
        } else {
          this.display = false;
          this.updateForm.patchValue({ name : data.NAME });
          this.updateForm.patchValue({ idNumber : data.IDNUMBER });
          this.updateForm.patchValue({ nation : data.NATION });
          this.updateForm.patchValue({ gender : data.GENDER });
          this.updateForm.patchValue({ birthDate : data.BIRTHDATE });
          this.updateForm.patchValue({ phoneNumber : data.PHONENUMBER });
          this.updateForm.patchValue({ address : data.ADDRESS });
        }
      });
    }
  }
}
