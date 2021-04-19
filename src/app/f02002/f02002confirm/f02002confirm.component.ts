import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02002confirm.component.html',
  styleUrls: ['./f02002confirm.component.css']
})
export class F02002confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02002confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
