import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f04002confirm.component.html',
  styleUrls: ['./f04002confirm.component.css']
})
export class F04002confirmComponent {
  constructor(public dialogRef: MatDialogRef<F04002confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
