import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f01003confirm.component.html',
  styleUrls: ['./f01003confirm.component.css']
})
export class F01003confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01003confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
