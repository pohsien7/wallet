import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './loginconfirm.component.html',
  styleUrls: ['./loginconfirm.component.css']
})
export class LoginconfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginconfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
