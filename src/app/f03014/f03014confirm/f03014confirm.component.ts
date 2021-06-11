import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03014confirm.component.html',
  styleUrls: ['./f03014confirm.component.css']
})
export class F03014confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03014confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
