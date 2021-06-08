import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f02014confirm',
  templateUrl: './f02014confirm.component.html',
  styleUrls: ['./f02014confirm.component.css']
})
export class F02014confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F02014confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
