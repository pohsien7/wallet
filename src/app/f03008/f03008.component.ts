import { F03008Service } from './f03008.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03008confirmComponent } from './f03008confirm/f03008confirm.component';
import { F03008wopenComponent } from './f03008wopen/f03008wopen.component';

@Component({
  selector: 'app-f03008',
  templateUrl: './f03008.component.html',
  styleUrls: ['./f03008.component.css', '../../assets/css/f03.css']
})
export class F03008Component implements OnInit {

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
  constructor(private fb: FormBuilder, public f03008Service: F03008Service, public dialog: MatDialog) { }

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
      await this.f03008Service.sendConsumer('consumer/f03008', formdata).then((data) => {
        msg = data.statusMessage;
        if (data.statusMessage == 'Success') {
          this.resultForm.patchValue({ dn: data.wallet.dn });
          this.resultForm.patchValue({ balance: data.wallet.balance });
          this.resultForm.patchValue({ totalCount: data.wallet.totalCount });
          this.resultForm.patchValue({ statusLastModified: data.wallet.statusLastModified })
        }
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03008confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F03008wopenComponent, {
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

  check() {
    if (this.searchWalletInforForm.value.queryWalletID.length == 23) {
      this.f03008Service.get("JNNAI", this.searchWalletInforForm.value.queryWalletID).then((data) => {
        if (data.IDerror == "error") {
          this.display = true;
        } else {
          this.display = false;
        }
      });
    }
  }

  clear() {
    this.resultForm.patchValue({ dn: "" });
    this.resultForm.patchValue({ balance: "" });
    this.resultForm.patchValue({ totalCount: "" });
    this.resultForm.patchValue({ statusLastModified: "" })
  }
}
