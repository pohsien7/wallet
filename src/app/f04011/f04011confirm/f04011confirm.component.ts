import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04011Service } from '../f04011.service';

@Component({
  templateUrl: './f04011confirm.component.html',
  styleUrls: ['./f04011confirm.component.css']
})
export class F04011confirmComponent implements OnInit {

  constructor(private fb: FormBuilder, public f04011Service: F04011Service, public dialogRef: MatDialogRef<F04011confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
