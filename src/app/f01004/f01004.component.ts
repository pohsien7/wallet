import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F01004Service } from './f01004.service';
import { F01004confirmComponent } from './f01004confirm/f01004confirm.component';

@Component({
  selector: 'app-f01004',
  templateUrl: './f01004.component.html',
  styleUrls: ['./f01004.component.css','../../assets/css/f01.css']
})
export class F01004Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  queryVaultIDForm: FormGroup = this.fb.group({
    vaultID: ['B-822', [Validators.maxLength(25)]],
    agencyID : ['B-822', []]
  });

  resultForm: FormGroup = this.fb.group({
    vaultID : ['', []],
    dn: ['', []],
    balance: ['', []],
    totalCount: ['', []],
    statusLastModified: ['', []],
    vaultcertSN: ['', []],
    agencycertSN: ['', []],
    frozen: ['', []],
    disabled: ['', []],
    cvc: ['', []],
    createTime: ['', []],
    settingLastModified: ['', []]
  });

  submitted = false;
  constructor(private fb: FormBuilder, public f01004Service: F01004Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    '';
  }

  isFieldEmpty() {
    if(this.queryVaultIDForm.value.vaultID == '' ) {
      return true;
    }
  }

  async sendCBDC() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.queryVaultIDForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.queryVaultIDForm.value));
      await this.f01004Service.sendConsumer('consumer/f01004', formdata).then((data) => {
        if (data.statusCode == "0000") {
          this.resultForm.patchValue({ vaultID : JSON.parse(data.rspJson).vault.vaultID });
          this.resultForm.patchValue({ dn : JSON.parse(data.rspJson).vault.dn });
          this.resultForm.patchValue({ balance : JSON.parse(data.rspJson).vault.balance });
          this.resultForm.patchValue({ totalCount : JSON.parse(data.rspJson).vault.totalCount });
          this.resultForm.patchValue({ statusLastModified : JSON.parse(data.rspJson).vault.statusLastModified });
          this.resultForm.patchValue({ vaultcertSN : JSON.parse(data.rspJson).vault.vaultcertSN });
          this.resultForm.patchValue({ agencycertSN : JSON.parse(data.rspJson).vault.agencycertSN });
          this.resultForm.patchValue({ frozen : JSON.parse(data.rspJson).vault.frozen });
          this.resultForm.patchValue({ disabled : JSON.parse(data.rspJson).vault.disabled });
          this.resultForm.patchValue({ cvc : JSON.parse(data.rspJson).vault.cvc });
          this.resultForm.patchValue({ createTime : JSON.parse(data.rspJson).vault.createTime });
          this.resultForm.patchValue({ settingLastModified : JSON.parse(data.rspJson).vault.settingLastModified });
          msg = data.statusMessage;
        } else {
          msg = data.statusMessage;
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F01004confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }
}
