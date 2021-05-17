import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03003confirm.component.html',
  styleUrls: ['./f03003confirm.component.css']
})
export class F03003confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03003confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
