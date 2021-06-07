import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02015confirm.component.html',
  styleUrls: ['./f02015confirm.component.css']
})
export class F02015confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F02015confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
