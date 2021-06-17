import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f02018confirm.component.html',
  styleUrls: ['./f02018confirm.component.css']
})
export class F02018confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F02018confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
