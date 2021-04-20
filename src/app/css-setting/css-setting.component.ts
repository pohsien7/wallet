import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-css-setting',
  templateUrl: './css-setting.component.html',
  styleUrls: ['./css-setting.component.css']
})
export class CssSettingComponent implements OnInit {

  /*ssForm: FormGroup = this.fb.group({
    color: [''],
  });*/

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /*changeColor() {
    alert(this.cssForm.value.color);
  }*/

}
