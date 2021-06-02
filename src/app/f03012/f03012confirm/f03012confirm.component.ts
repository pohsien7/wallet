import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03012confirm.component.html',
  styleUrls: ['./f03012confirm.component.css']
})
export class F03012confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03012confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
