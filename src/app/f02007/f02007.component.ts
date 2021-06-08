import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02007Service } from './f02007.service';
import { F02007confirmComponent } from './f02007confirm/f02007confirm.component';

interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f02007',
  templateUrl: './f02007.component.html',
  styleUrls: ['./f02007.component.css','../../assets/css/f02.css']
})
export class F02007Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('invisibleText') invTextER: ElementRef;
  width: number = 300;
  statusMessage: string = '';
  display = false;
  mccCode: COMB[] = [{ value: 'C1234', viewValue: '等待中信' }, { value: 'C4321', viewValue: '提供資料' }];
  registrationForm: FormGroup = this.fb.group({
    mcc: ['C1234', [Validators.required]],
    dn: ['', [Validators.maxLength(30)]],
    statusCode: ['',[]],
    statusMessage: ['',[]],
    walletID: ['',[]]
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02007Service: F02007Service, public dialog: MatDialog) { }

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
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02007Service.sendConsumer('consumer/f02007', formdata).then((data) => {
        msg = data.statusMessage;
        dataMsg = data.statusMessage;
        this.registrationForm.patchValue({statusCode: data.statusCode});
        this.registrationForm.patchValue({statusMessage: data.statusMessage});
        this.registrationForm.patchValue({walletID: data.walletID});
        this.statusMessage = data.statusMessage;
        this.resizeInput(data.statusMessage);
      });
      console.log(JSON.stringify(this.registrationForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02007confirmComponent, { data: { msgStr: msg } });
      if (dataMsg != "") {this.display = true; }
    }, 1500);

  }
  resizeInput(inputText) {
    setTimeout ( () =>{
      const minWidth = 200;
      if (this.invTextER.nativeElement.offsetWidth > minWidth) {
        this.width = this.invTextER.nativeElement.offsetWidth + 50;
      } else {
        this.width = minWidth;
      }
    }, 0);
  }
}
