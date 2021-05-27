import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03011confirm.component.html',
  styleUrls: ['./f03011confirm.component.css']
})
export class F03011confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03011confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
