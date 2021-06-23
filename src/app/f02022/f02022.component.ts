import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02022Service } from './f02022.service';
import { F02022confirmComponent } from './f02022confirm/f02022confirm.component';


@Component({
  selector: 'app-f02022',
  templateUrl: './f02022.component.html',
  styleUrls: ['./f02022.component.css', '../../assets/css/f02.css']
})
export class F02022Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('invisibleText') invTextER: ElementRef;
  width: number = 300;
  statusMessage: string = '';
  display = false;
  registrationForm: FormGroup = this.fb.group({
    cert: ['', [Validators.required]],
    remark:['']
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02022Service: F02022Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : '';
  }

  async onSubmit() {
    let msg = '';
    let dataMsg = '';
    this.submitted = true;
    this.display = false;
    this.blockUI.start('Loading...');
    if(!this.registrationForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      alert(jsonStr)
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02022Service.sendConsumer('consumer/f02022', formdata).then((data) => {
        msg = data.statusMessage;
        dataMsg = data.statusMessage;
        console.log(data);
        this.registrationForm.patchValue({statusCode: data.statusCode});
        this.registrationForm.patchValue({statusMessage: data.statusMessage});
        this.statusMessage = data.statusMessage;
      });
      console.log(JSON.stringify(this.registrationForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02022confirmComponent, { data: { msgStr: msg } });
      if (dataMsg != "") {this.display = true; }
    }, 1500);

  }

}

