import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04006Service } from '../f04006.service';

@Component({
  templateUrl: './f04006confirm.component.html',
  styleUrls: ['./f04006confirm.component.css']
})
export class F04006confirmComponent {

  removeShopForm: FormGroup = this.fb.group({
    cvc: ['']
  });

  constructor(private fb: FormBuilder, public f04006Service: F04006Service, public dialogRef: MatDialogRef<F04006confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog ) { }

  close(){
    this.dialogRef.close();
  }

}
