import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02009confirm.component.html',
  styleUrls: ['./f02009confirm.component.css']
})
export class F02009confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F02009confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
