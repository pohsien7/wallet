import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F04003Service } from '../f04003.service';

@Component({
  templateUrl: './f04003confirm.component.html',
  styleUrls: ['./f04003confirm.component.css']
})
export class F04003confirmComponent {

  removeShopForm: FormGroup = this.fb.group({
    walletId: ['']
  });

  constructor(private fb: FormBuilder, public f04003Service: F04003Service, public dialogRef: MatDialogRef<F04003confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog ) { }

  close(){
    this.dialogRef.close();
  }

  async remove(id: string){
    const formdata: FormData = new FormData();
    this.removeShopForm.patchValue( { walletId: id } );
    formdata.append('value', JSON.stringify(this.removeShopForm.value));
    await this.f04003Service.sendConsumer('consumer/f04003RemoveShop', formdata).then((data) => {
      this.dialog.open(F04003confirmComponent, { data: { msgStr: data.result } });
    });
    this.dialogRef.close();
  }
}
