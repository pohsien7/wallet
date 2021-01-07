import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDelete } from 'src/app/interfaceCRUD.component';
import { F06003Service } from '../f06003.service';

@Component({
  templateUrl: './f06003delete.component.html',
  styleUrls: ['./f06003delete.component.css']
})
export class F06003deleteComponent implements DialogDelete {

  constructor(public dialogRef: MatDialogRef<F06003deleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06003Service: F06003Service, public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    // this.f04001Service.updateMappingCode(this.data);
  }

}
