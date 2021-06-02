import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03013confirm.component.html',
  styleUrls: ['./f03013confirm.component.css']
})
export class F03013confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03013confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
