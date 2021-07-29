import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04008Service } from '../f04008.service';

@Component({
  templateUrl: './f04008confirm.component.html',
  styleUrls: ['./f04008confirm.component.css']
})
export class F04008confirmComponent implements OnInit {

  constructor(private fb: FormBuilder, public f04008Service: F04008Service, public dialogRef: MatDialogRef<F04008confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
