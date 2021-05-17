import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03004confirm.component.html',
  styleUrls: ['./f03004confirm.component.css']
})
export class F03004confirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<F03004confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit(): void {
  }

}
