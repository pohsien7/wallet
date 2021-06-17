import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F02016Service } from './f02016.service';
import { F02016confirmComponent } from './f02016confirm/f02016confirm.component';
import { F02016wopenComponent } from './f02016wopen/f02016wopen.component';

@Component({
  selector: 'app-f02016',
  templateUrl: './f02016.component.html',
  styleUrls: ['./f02016.component.css','../../assets/css/f02.css']
})
export class F02016Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  
  updatePubkeyForm: FormGroup = this.fb.group({
    walletID:['',[Validators.required, Validators.minLength(23), Validators.maxLength(23)]],
    remark:['更新錢包公鑰',[Validators.maxLength(30)]],
  });

  submitted = false;

  constructor(private fb: FormBuilder, public f02016Service: F02016Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage(cloumnName: string) {
    let obj = this.updatePubkeyForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' : obj.hasError('maxlength') ? '長度過長' :
           obj.hasError('minlength') ? '長度過短' :  '';
  }

  async onSubmit(){
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if ( !this.updatePubkeyForm.valid ) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.updatePubkeyForm.value);
      let jsonObj = JSON.parse(jsonStr);
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f02016Service.sendConsumer('consumer/f02016', formdata).then((data) => {
        msg = data.statusMessage;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      this.dialog.open(F02016confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getList() {
    const dialogRef = this.dialog.open(F02016wopenComponent, {
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.updatePubkeyForm.patchValue({ walletID : result.walletID });
      }
    });
  }
}
