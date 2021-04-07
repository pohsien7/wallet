import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDelete } from 'src/app/interfaceCRUD.component';
import { F06002Service } from '../f06002.service';


@Component({
  templateUrl: './f06002delete.component.html',
  styleUrls: ['./f06002delete.component.css']
})
export class F06002deleteComponent implements DialogDelete {

  constructor(public dialogRef: MatDialogRef<F06002deleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06002Service: F06002Service, public dialog: MatDialog) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    confirmDelete(): void {
      // this.f04001Service.updateMappingCode(this.data);
    }
}
