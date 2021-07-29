import { QrcodeService } from './qrcode.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  imageSource : string;
  constructor(private fb: FormBuilder,private sanitizer: DomSanitizer, public qrcodeService: QrcodeService) {}


  ngOnInit(): void {

  }

  registrationForm: FormGroup = this.fb.group({
    recipientID: ['', [Validators.required]],
    dn: ['', [Validators.required]],
    amount: ['', Validators.pattern('^[0-9]+$')],
    won:['pay'],
    cvc:['*']

  });

  getErrorMessage(cloumnName: string) {
    let obj = this.registrationForm.get(cloumnName);
    return obj.hasError('required')  ? '此為必填欄位!' :'';

  }

async onSubmit() {
    let msg = '';
    const formdata: FormData = new FormData();
    formdata.append('value', JSON.stringify(this.registrationForm.value));

    if(!this.registrationForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else{
      await this.qrcodeService.sendConsumer('consumer/qrcode', formdata).then((data) => {
        this.imageSource = data.String;
      });
    }
  }
}
