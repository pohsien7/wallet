import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02010confirm.component.html',
  styleUrls: ['./f02010confirm.component.css']
})
export class F02010confirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<F02010confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit(): void {
  }

}
