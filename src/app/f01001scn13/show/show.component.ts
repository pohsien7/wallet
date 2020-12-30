import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  constructor(public dialogRef: MatDialogRef<ShowComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
