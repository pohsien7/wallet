import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03006confirm.component.html',
  styleUrls: ['./f03006confirm.component.css']
})
export class F03006confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03006confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
