import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02019Component } from '../f02019.component';
import { F02019Service } from '../f02019.service';
import { F02019confirmComponent } from '../f02019confirm/f02019confirm.component';
import { F02019wopenComponent } from '../f02019wopen/f02019wopen.component';

@Component({
  selector: 'app-f02019child3',
  templateUrl: './f02019child3.component.html',
  styleUrls: ['./f02019child3.component.css','../../../assets/css/f02.css']
})
export class F02019child3Component implements OnInit {

  updateLimitForm: FormGroup = this.fb.group({
    walletID:['',[Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    balanceLimit: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    keyTxnLimit: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(18), Validators.pattern('^[0-9]+$')]],
    remark:['',[Validators.maxLength(30)]],
    certTxnLimit: ['0']
  });

  submitted = false;
  display = false;
  constructor(private injector: Injector, private fb: FormBuilder, public f02019Service: F02019Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.updateLimitForm.patchValue({ walletID : localStorage.getItem('walletID') });
    this.updateLimitForm.patchValue({ balanceLimit : localStorage.getItem('balanceLimit') });
    this.updateLimitForm.patchValue({ certTxnLimit : localStorage.getItem('certTxnLimit') });
    this.updateLimitForm.patchValue({ keyTxnLimit : localStorage.getItem('keyTxnLimit') });
    localStorage.removeItem('walletID');
    localStorage.removeItem('balanceLimit');
    localStorage.removeItem('certTxnLimit');
    localStorage.removeItem('keyTxnLimit');
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.updateLimitForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' : obj.hasError('pattern')   ? '請輸入數字' : '';
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    if ( !this.updateLimitForm.valid ) {
      msg = '資料格式有誤，請修正!'
    } else if ( parseInt(this.updateLimitForm.value.balanceLimit) <= parseInt(this.updateLimitForm.value.keyTxnLimit) ) {
      msg = '交易限額不可大於或等於餘額限額'
    } else {
      let jsonStr = JSON.stringify(this.updateLimitForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02019Service.sendConsumer('consumer/f02019', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.dialog.open(F02019confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02019wopenComponent, {
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.updateLimitForm.patchValue({ walletID: result.walletID });
        this.updateLimitForm.patchValue({ balanceLimit: result.balanceLimit });
        this.updateLimitForm.patchValue({ certTxnLimit: result.keyTxnLimit });
        this.updateLimitForm.patchValue({ keyTxnLimit: result.certTxnLimit });
        this.injector.get(F02019Component).set(result.which);
      }
    });
  }

  clear() {
    this.updateLimitForm.patchValue({ walletID: '' });
    this.updateLimitForm.patchValue({ balanceLimit: '' });
    this.updateLimitForm.patchValue({ certTxnLimit: '' });
    this.updateLimitForm.patchValue({ keyTxnLimit: '' });
  }

  get() {
    let balanceLimit: string, certTxnLimit: string, keyTxnLimit: string, which: string;
    if (this.updateLimitForm.value.walletID.length == 23) {
      this.f02019Service.get("JNNA", this.updateLimitForm.value.walletID).then((data) => {
        if (data.IDerror == "error") {
          this.display = true;
        } else {
          this.display = false;
          if (data.tableName == 'ANONYMOUS_WALLET' || data.tableName == 'NPWALLET_PUBKEY') {
            balanceLimit = data.BALANCELIMIT;
            keyTxnLimit = data.KEYTXNLIMIT;
            certTxnLimit = '0';
            which = 'C';
          } else {
            if (data.KEYTXNLIMIT == null) {
              balanceLimit = data.BALANCELIMIT;
              certTxnLimit = data.CERTTXNLIMIT;
              keyTxnLimit = '0';
              which = 'B';
            } else {
              balanceLimit = data.BALANCELIMIT;
              keyTxnLimit = data.KEYTXNLIMIT;
              certTxnLimit = data.CERTTXNLIMIT;
              which = 'A';
            }
          }
          localStorage.setItem('walletID', this.updateLimitForm.value.walletID);
          localStorage.setItem('balanceLimit', balanceLimit);
          localStorage.setItem('keyTxnLimit', keyTxnLimit);
          localStorage.setItem('certTxnLimit', certTxnLimit);
          this.injector.get(F02019Component).set(which);
        }
      });
    }
  }
}
