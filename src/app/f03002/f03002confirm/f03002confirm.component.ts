import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03002confirm.component.html',
  styleUrls: ['./f03002confirm.component.css']
})
export class F03002confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03002confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
