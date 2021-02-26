import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f04003confirm.component.html',
  styleUrls: ['./f04003confirm.component.css']
})
export class F04003confirmComponent {
  constructor(public dialogRef: MatDialogRef<F04003confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
