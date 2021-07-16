import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './numbertestconfirm.component.html',
  styleUrls: ['./numbertestconfirm.component.css']
})
export class NumbertestConfirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<NumbertestConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
  }

}
