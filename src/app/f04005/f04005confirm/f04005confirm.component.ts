import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04005Service } from '../f04005.service';

@Component({
  templateUrl: './f04005confirm.component.html',
  styleUrls: ['./f04005confirm.component.css']
})
export class F04005confirmComponent {

  removeShopForm: FormGroup = this.fb.group({
    userId: ['']
  });

  constructor(private fb: FormBuilder, public f04005Service: F04005Service, public dialogRef: MatDialogRef<F04005confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  close(){
    this.dialogRef.close();
  }

  async remove(userId: string){
    const formdata: FormData = new FormData();
    this.removeShopForm.patchValue( { userId: userId } );
    formdata.append('value', JSON.stringify(this.removeShopForm.value));
    await this.f04005Service.sendConsumer('consumer/f04005RemoveShop', formdata).then((data) => {
      this.dialog.open(F04005confirmComponent, { data: { msgStr: data.result } });
    });
    this.dialogRef.close();
  }

}
