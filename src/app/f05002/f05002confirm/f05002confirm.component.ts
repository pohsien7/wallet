import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f05002confirm.component.html',
  styleUrls: ['./f05002confirm.component.css']
})
export class F05002confirmComponent {
  constructor(public dialogRef: MatDialogRef<F05002confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
