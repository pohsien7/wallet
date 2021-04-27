import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f04004confirm.component.html',
  styleUrls: ['./f04004confirm.component.css']
})
export class F04004confirmComponent {
  constructor(public dialogRef: MatDialogRef<F04004confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
