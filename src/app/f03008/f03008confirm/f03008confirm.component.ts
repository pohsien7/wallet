import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03008confirm.component.html',
  styleUrls: ['./f03008confirm.component.css']
})
export class F03008confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03008confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
