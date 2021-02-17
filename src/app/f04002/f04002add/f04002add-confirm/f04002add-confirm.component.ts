import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f04002add-confirm.component.html',
  styleUrls: ['./f04002add-confirm.component.css']
})

export class F04002addConfirmComponent {
  constructor(public dialogRef: MatDialogRef<F04002addConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
