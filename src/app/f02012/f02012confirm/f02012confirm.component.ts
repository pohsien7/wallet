import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02012confirm.component.html',
  styleUrls: ['./f02012confirm.component.css']
})
export class F02012confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02012confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
