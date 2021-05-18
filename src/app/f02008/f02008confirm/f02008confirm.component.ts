import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02008confirm.component.html',
  styleUrls: ['./f02008confirm.component.css']
})
export class F02008confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02008confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
