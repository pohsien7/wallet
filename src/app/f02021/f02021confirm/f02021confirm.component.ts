import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02021confirm.component.html',
  styleUrls: ['./f02021confirm.component.css']
})
export class F02021confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F02021confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
