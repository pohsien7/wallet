import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02005confirm.component.html',
  styleUrls: ['./f02005confirm.component.css']
})
export class F02005confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02005confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
