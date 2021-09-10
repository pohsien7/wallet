import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04009Service } from '../f04009.service';

@Component({
  templateUrl: './f04009confirm.component.html',
  styleUrls: ['./f04009confirm.component.css']
})
export class F04009confirmComponent implements OnInit {

  constructor(private fb: FormBuilder, public f04009Service: F04009Service, public dialogRef: MatDialogRef<F04009confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
