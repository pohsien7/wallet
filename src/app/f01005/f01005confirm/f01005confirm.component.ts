import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01005confirm',
  templateUrl: './f01005confirm.component.html',
  styleUrls: ['./f01005confirm.component.css']
})
export class F01005confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01005confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
