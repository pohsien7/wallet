import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f01006confirm.component.html',
  styleUrls: ['./f01006confirm.component.css']
})
export class F01006confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01006confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
