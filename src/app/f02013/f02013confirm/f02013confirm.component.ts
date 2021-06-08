import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02013confirm.component.html',
  styleUrls: ['./f02013confirm.component.css']
})
export class F02013confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02013confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
