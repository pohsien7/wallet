import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03010Service } from './f03010.service';
import { F03010confirmComponent } from './f03010confirm/f03010confirm.component';
import { F03010wopenComponent } from './f03010wopen/f03010wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03010',
  templateUrl: './f03010.component.html',
  styleUrls: ['./f03010.component.css','../../assets/css/f03.css']
})
export class F03010Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }];
  constructor(private fb: FormBuilder, public f03010Service: F03010Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  queryForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    startTime: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    endTime: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    walletType: ['']
  });

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      '';
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  ledgerStateListData = new MatTableDataSource<any>();

  ngAfterViewInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      if(!this.isFieldEmpty()) { this.onSubmit(); }
    });

  }

  isFieldEmpty() {
    if(this.queryForm.value.walletID == '' && this.queryForm.value.cvc == ''
      && this.queryForm.value.startTime =='' && this.queryForm.value.endTime ==''
    ) {
      return true;
    }
  }


  submitted = false;

  async onSubmit() {
    let msg = '';
    this.submitted = true;
    this.blockUI.start('Loading...');
    if(!this.queryForm.valid) {
      msg = '資料格式有誤，請修正!'
    } else {
      let jsonStr = JSON.stringify(this.queryForm.value);
      let jsonObj = JSON.parse(jsonStr);
      let startTime = new Date(this.queryForm.value.startTime);
      let endTime = new Date(this.queryForm.value.endTime);
      jsonObj.startTime = this.datePipe.transform(startTime,"yyyy-MM-dd");
      jsonObj.endTime = this.datePipe.transform(endTime,"yyyy-MM-dd");
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      await this.f03010Service.sendConsumer('consumer/f03010', formdata).then((data) => {
        msg = data.statusMessage;
        if ( data.ledgerStateList.length == 0 ) {
          this.clear();
          return this.dialog.open(F03010confirmComponent, { data: { msgStr: '未查詢到相關錢包，請填寫正確查詢資料!' } });
        }
        console.log(data.ledgerStateList.length);
        this.totalCount = data.ledgerStateList.length;
        this.ledgerStateListData.data = data.ledgerStateList;
      });
    }
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
      const childernDialogRef = this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } });
    }, 3000);
  }

  getList() {
    const dialogRef = this.dialog.open(F03010wopenComponent, {
      data: { queryWalletID: this.queryForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.queryForm.patchValue({ walletID : result.value });
        this.queryForm.patchValue({ walletType : result.walletType });
      }
    });
  }

  setTimes() {
    if (this.queryForm.value.endTime == null) {
      this.queryForm.patchValue({endTime:this.queryForm.value.startTime});
    }
  }

  clear() {
    // this.registrationForm.reset();
    // this.registrationForm.setValue({
    this.queryForm.patchValue({
      walletID:'', startTime:'', endTime:'', walletType:''
    });
  }
}
