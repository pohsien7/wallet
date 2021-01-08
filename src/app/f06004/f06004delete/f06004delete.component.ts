import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDelete } from 'src/app/interfaceCRUD.component';
import { F06004Service } from '../f06004.service';

@Component({
  templateUrl: './f06004delete.component.html',
  styleUrls: ['./f06004delete.component.css']
})
export class F06004deleteComponent implements DialogDelete {

  constructor(public dialogRef: MatDialogRef<F06004deleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06004Service: F06004Service, public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

  }



}
