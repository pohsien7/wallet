import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './barcodetestconfirm.component.html',
  styleUrls: ['./barcodetestconfirm.component.css']
})
export class BarcodetestConfirmComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BarcodetestConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
  }

}
