import { F02021Service } from './f02021.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02021confirmComponent } from './f02021confirm/f02021confirm.component';
import { F02021wopenComponent } from './f02021wopen/f02021wopen.component';

@Component({
  selector: 'app-f02021',
  templateUrl: './f02021.component.html',
  styleUrls: ['./f02021.component.css', '../../assets/css/f03.css']
})
export class F02021Component implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  searchWalletInforForm: FormGroup = this.fb.group({
    queryWalletID: ['', [Validators.required, Validators.minLength(22), Validators.maxLength(25)]],
    walletType: ['']
  });

  resultForm: FormGroup = this.fb.group({
    dn: ['', []],
    balance: ['', []],
    totalCount: ['', []],
    statusLastModified: ['', []]
  });

  submitted = false;
  display = false;
  constructor(private fb: FormBuilder, public f02021Service: F02021Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.searchWalletInforForm.get(cloumnName);
    return obj.hasError('required') ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
      obj.hasError('minlength') ? '長度過短' : '';
  }

  async onSubmit() {
    this.clear();
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if (!this.searchWalletInforForm.valid) {
      msg = '資料必填喔!'
    } else {
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(this.searchWalletInforForm.value));
      await this.f02021Service.sendConsumer('consumer/f02021', formdata).then((data) => {
        msg = data.statusMessage;
        if (data.statusMessage == 'Success') {
          console.log(data)
          this.resultForm.patchValue({ dn: data.dn });
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F02021confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02021wopenComponent, {
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.searchWalletInforForm.patchValue({ queryWalletID: result.value });
        this.searchWalletInforForm.patchValue({ walletType: result.walletType });
      }
    });
    this.display = false;
  }

  clear() {
    this.resultForm.patchValue({ dn: "" });
  }
}
