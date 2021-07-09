import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04007Service } from '../f04007.service';

@Component({
  templateUrl: './f04007confirm.component.html',
  styleUrls: ['./f04007confirm.component.css']
})
export class F04007confirmComponent implements OnInit {

  constructor(private fb: FormBuilder, public f04007Service: F04007Service, public dialogRef: MatDialogRef<F04007confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
