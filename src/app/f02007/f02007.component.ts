import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02007Service } from './f02007.service';
import { F02007confirmComponent } from './f02007confirm/f02007confirm.component';

@Component({
  selector: 'app-f02007',
  templateUrl: './f02007.component.html',
  styleUrls: ['./f02007.component.css','../../assets/css/f02.css']
})
export class F02007Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  registrationForm: FormGroup = this.fb.group({
    // userID: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
    dn: ['', [Validators.maxLength(30)]]
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
    this.submitted = true;
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
      });
      console.log(JSON.stringify(this.registrationForm.value));
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02007confirmComponent, { data: { msgStr: msg } });
    }, 500);
  }
}
