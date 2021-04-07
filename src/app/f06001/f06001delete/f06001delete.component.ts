import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDelete } from 'src/app/interfaceCRUD.component';
import { F06001Service } from '../f06001.service';

@Component({
  templateUrl: './f06001delete.component.html',
  styleUrls: ['./f06001delete.component.css']
})
export class F06001deleteComponent implements DialogDelete {

  constructor(public dialogRef: MatDialogRef<F06001deleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public f06001Service: F06001Service, public dialog: MatDialog) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    confirmDelete(): void {
      // this.f04001Service.updateMappingCode(this.data);
    }
}
