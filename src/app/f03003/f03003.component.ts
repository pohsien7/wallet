import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03003Service } from './f03003.service';
import { F03003confirmComponent } from './f03003confirm/f03003confirm.component';
import { F03003wopenComponent } from './f03003wopen/f03003wopen.component';

@Component({
  selector: 'app-f03003',
  templateUrl: './f03003.component.html',
  styleUrls: ['./f03003.component.css','../../assets/css/f03.css']
})
export class F03003Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  authorizaionForm: FormGroup = this.fb.group({
    operation:['withdraw',[Validators.required ,Validators.maxLength(30)]],
    walletID:['',[Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    recipientID:['',[Validators.required, Validators.maxLength(23)]],
    remark:['',[Validators.maxLength(30)]],
    walletType:['']
  });

  // checkForm: FormGroup = this.fb.group({
  //   walletID: ['']
  // });
  display1 = false;
  display2 = false;
  submitted = false;

  constructor(private fb: FormBuilder, public f03003Service: F03003Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.authorizaionForm.patchValue({walletID : this.data.walletId});
    this.authorizaionForm.patchValue({walletType: this.data.walletType});
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.authorizaionForm.get(cloumnName);
    // if ( cloumnName == 'walletID' && this.authorizaionForm.value.walletID.length == 23 ) {
    //   this.checkForm.patchValue({ walletID: this.authorizaionForm.value.walletID });
    //   let jsonStr = JSON.stringify(this.checkForm.value);
    //   let jsonObj = JSON.parse(jsonStr);
    //   const formdata: FormData = new FormData();
    //   formdata.append('value', JSON.stringify(jsonObj));
    //   this.f03003Service.sendConsumer('consumer/f03003CheckID', formdata).then((data) => {
    //     if ( data == null) {
    //       obj.setErrors({ 'WalletIDError': true })
    //     }
    //   });
    // }
    return obj.hasError('required')  ? '??????????????????!' : obj.hasError('maxlength') ? '????????????' :
           obj.hasError('minlength') ? '????????????' :  '';
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if ( !this.authorizaionForm.valid ) {
      msg = '??????????????????????????????!'
    } else {
      let jsonStr = JSON.stringify(this.authorizaionForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f03003Service.sendConsumer('consumer/f03003', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03003confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList(num: string) {
    if ( num == '1') {
      const dialogRef = this.dialog.open(F03003wopenComponent, {
        data: { queryWalletID: this.authorizaionForm.value.walletID , num: num },
        minHeight: '100vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') {
          this.authorizaionForm.patchValue({ walletID : result.value });
          this.authorizaionForm.patchValue({ walletType : result.walletType });
        }
      });
      this.display1 = false;
    } else {
      const dialogRef = this.dialog.open(F03003wopenComponent, {
        data: { queryWalletID: this.authorizaionForm.value.walletID , num: num },
        minHeight: '100vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') {
          this.authorizaionForm.patchValue({ recipientID : result.value });
        }
      });
      this.display2 = false;
    }
  }

  check(choose: string) {
    if ( choose == '1' ) {
      if (this.authorizaionForm.value.walletID.length == 23) {
        this.f03003Service.get("JNNA", this.authorizaionForm.value.walletID).then((data) => {
          if (data.IDerror == "error") {
            this.display1 = true;
          } else {
            this.display1 = false;
          }
        });
      }
    } else {  
      if (this.authorizaionForm.value.recipientID.length == 23) {
        this.f03003Service.get("JNNA", this.authorizaionForm.value.recipientID).then((data) => {
          if (data.IDerror == "error") {
            this.display2 = false;
          } else {
            this.display2 = true;
          }
        });
      }
    }
  }
}
