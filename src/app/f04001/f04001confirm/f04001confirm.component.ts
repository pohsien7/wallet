import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f04001confirm.component.html',
  styleUrls: ['./f04001confirm.component.css']
})
export class F04001confirmComponent {
  constructor(public dialogRef: MatDialogRef<F04001confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
