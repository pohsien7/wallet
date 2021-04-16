import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02001confirm.component.html',
  styleUrls: ['./f02001confirm.component.css']
})
export class F02001confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02001confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
