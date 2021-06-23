import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02022confirm.component.html',
  styleUrls: ['./f02022confirm.component.css']
})
export class F02022confirmComponent  {

  constructor(public dialogRef: MatDialogRef<F02022confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
