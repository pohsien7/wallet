import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f03005confirm.component.html',
  styleUrls: ['./f03005confirm.component.css']
})
export class F03005confirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<F03005confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit(): void {
  }

}
