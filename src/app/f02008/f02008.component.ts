import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02008Service } from './f02008.service';
import { F02008confirmComponent } from './f02008confirm/f02008confirm.component';
import { F02008wopenComponent } from './f02008wopen/f02008wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02008',
  templateUrl: './f02008.component.html',
  styleUrls: ['./f02008.component.css','../../assets/css/f02.css']
})
export class F02008Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  nationCode: COMB[] = [{ value: 'TWN', viewValue: 'Taiwan' }, { value: 'JAN', viewValue: 'Japan' }, { value: 'USA', viewValue: 'USA' }];
  genderCode: COMB[] = [{ value: 'M', viewValue: '男' }, { value: 'F', viewValue: '女' }];

  upgradeWalletForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    idNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nation: ['TWN', [Validators.required]],
    gender: ['', [Validators.required]],
    birthDate: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    address: ['', [Validators.required, Validators.maxLength(128)]],
    userId: ['']
  });
  gender: string;
  nation: string;
  submitted = false;

  constructor(private fb: FormBuilder, public f02008Service: F02008Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.getNation();
    //this.getGender();
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.upgradeWalletForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' :
           obj.hasError('idNumberError')  ? '身分證格式錯誤' : '';
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.upgradeWalletForm.valid) {
      msg = '資料必填喔!'
    } else {
      let jsonStr = JSON.stringify(this.upgradeWalletForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let selectedDate = new Date(this.upgradeWalletForm.value.birthDate);
      jsonObj.birthDate = this.datePipe.transform(selectedDate,"yyyy-MM-dd");
      console.log(jsonObj.birthDate)
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      // formdata.append('value', JSON.stringify(this.upgradeWalletForm.value));
      await this.f02008Service.sendConsumer('consumer/f02008', formdata).then((data) => {
        msg = data.statusMessage;

      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02008confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getGender() {
    const formdata: FormData = new FormData();
    this.f02008Service.sendConsumer('consumer/f02008/getGender', formdata).then((data) => {
      this.gender = data.gender;
    });
  }
  getNation() {
    const formdata: FormData = new FormData();
    this.f02008Service.sendConsumer('consumer/f02008/getNation', formdata).then((data) => {
      this.nation = data.nation;
    });
  }

  getList() {
    const dialogRef = this.dialog.open(F02008wopenComponent, {
      data: { queryWalletID: this.upgradeWalletForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.upgradeWalletForm.patchValue({ queryWalletID : result.value });
        this.upgradeWalletForm.patchValue({ dn : result.name });
        this.upgradeWalletForm.patchValue({ userId : result.userId });

      }
    });
  }

}
