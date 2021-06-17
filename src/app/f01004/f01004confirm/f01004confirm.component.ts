import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f01004confirm.component.html',
  styleUrls: ['./f01004confirm.component.css']
})
export class F01004confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01004confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
