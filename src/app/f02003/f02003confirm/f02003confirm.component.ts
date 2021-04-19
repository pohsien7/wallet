import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02003confirm.component.html',
  styleUrls: ['./f02003confirm.component.css']
})
export class F02003confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02003confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
