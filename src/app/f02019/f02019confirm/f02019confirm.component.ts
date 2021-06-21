import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02019confirm.component.html',
  styleUrls: ['./f02019confirm.component.css']
})
export class F02019confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F02019confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
