import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02011confirm.component.html',
  styleUrls: ['./f02011confirm.component.css']
})
export class F02011confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02011confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
