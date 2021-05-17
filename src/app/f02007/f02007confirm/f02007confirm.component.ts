import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02007confirm.component.html',
  styleUrls: ['./f02007confirm.component.css']
})
export class F02007confirmComponent {
  constructor(public dialogRef: MatDialogRef<F02007confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
