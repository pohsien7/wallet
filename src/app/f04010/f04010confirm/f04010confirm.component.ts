import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04010Service } from '../f04010.service';

@Component({
  templateUrl: './f04010confirm.component.html',
  styleUrls: ['./f04010confirm.component.css']
})
export class F04010confirmComponent implements OnInit {

  constructor(private fb: FormBuilder, public f04010Service: F04010Service, public dialogRef: MatDialogRef<F04010confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
