import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f01007confirm.component.html',
  styleUrls: ['./f01007confirm.component.css']
})
export class F01007confirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<F01007confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
  }

}
