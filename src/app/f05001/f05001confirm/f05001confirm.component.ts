import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f05001confirm.component.html',
  styleUrls: ['./f05001confirm.component.css']
})
export class F05001confirmComponent {
  constructor(public dialogRef: MatDialogRef<F05001confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
