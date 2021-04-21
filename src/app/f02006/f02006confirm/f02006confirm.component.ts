import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02006confirm.component.html',
  styleUrls: ['./f02006confirm.component.css']
})
export class F02006confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02006confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
