import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './add-confirm.component.html',
  styleUrls: ['./add-confirm.component.css']
})
export class AddConfirmComponent {

  constructor(public dialogRef: MatDialogRef<AddConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


}
