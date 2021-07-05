import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02017Service } from './f02017.service';
import { F02017confirmComponent } from './f02017confirm/f02017confirm.component';
import { F02017wopenComponent } from './f02017wopen/f02017wopen.component';

@Component({
  selector: 'app-f02017',
  templateUrl: './f02017.component.html',
  styleUrls: ['./f02017.component.css','../../assets/css/f02.css']
})
export class F02017Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  ExtendPubkeyForm: FormGroup = this.fb.group({
    walletID:['',[Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    newKeyTxnLimit: ['', [Validators.required]],
    remark:['新增錢包EC公鑰',[Validators.maxLength(30)]],
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02017Service: F02017Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.ExtendPubkeyForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' :  '';
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if ( !this.ExtendPubkeyForm.valid ) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.ExtendPubkeyForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02017Service.sendConsumer('consumer/f02017', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      this.dialog.open(F02017confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02017wopenComponent, {
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.ExtendPubkeyForm.patchValue({ walletID : result.walletID });
      }
    });
  }
}
