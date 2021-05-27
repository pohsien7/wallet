import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03009confirm.component.html',
  styleUrls: ['./f03009confirm.component.css']
})
export class F03009confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03009confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
