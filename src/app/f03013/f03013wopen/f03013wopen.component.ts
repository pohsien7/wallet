import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03013Service } from '../f03013.service';
import { F03013confirmComponent } from '../f03013confirm/f03013confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  templateUrl: './f03013wopen.component.html',
  styleUrls: ['./f03013wopen.component.css']
})
export class F03013wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    walletType: ['', [Validators.required]],
    walletId:[''],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  walletOption: sysCode[] = [{value: 'WALLET_CV', viewValue: 'WALLET_CV'}];

  constructor(public dialogRef: MatDialogRef<F03013wopenComponent>, private fb: FormBuilder, private datePipe: DatePipe, private f03013Service: F03013Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  walletIdSource = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null,

    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getWalletId();
    });
  }

  cleanToEmpty() {
    this.searchForm.patchValue({ walletType : '' });
    this.searchForm.patchValue({ startTime : '' });
    this.searchForm.patchValue({ endTime : '' });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.walletIdSource.data = null;
  }

  async getWalletId() {
    let jsonStr :string = JSON.stringify(this.searchForm.value);
    let jsonObj = JSON.parse(jsonStr);
    //1.????????????
    // if (this.searchForm.value.startTime != '' && this.searchForm.value.endTime != '') {
    //   let selectedStartDate = new Date(this.searchForm.value.startTime);
    //   let selectedEndDate = new Date(this.searchForm.value.endTime);
    //   jsonObj.startTime = this.datePipe.transform(selectedStartDate,"yyyy-MM-dd");
    //   jsonObj.endTime = this.datePipe.transform(selectedEndDate,"yyyy-MM-dd");
    // }
    //2.????????????
    let page :string = `${this.currentPage.pageIndex + 1}`;
    let perPage :string = `${this.currentPage.pageSize}`;
    jsonObj.page = page;
    jsonObj.perPage = perPage;
    //3.????????????
    let jsonString :string = JSON.stringify(jsonObj);
    this.f03013Service.getWalletIdList('/consumer/f03013fn01', jsonString).subscribe(data => {
      this.totalCount = data.size;
      this.walletIdSource.data = data.items;
      if ( this.totalCount == 0 ) {
        this.dialog.open(F03013confirmComponent, { data: { msgStr: "????????????" } });
      }
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '??????????????????!' : '';
  }

  setEndTimes() {
    if (this.searchForm.value.startTime != null && this.searchForm.value.endTime == null) {
      this.searchForm.patchValue({ endTime:this.searchForm.value.startTime });
    }
  }

  goBack(walletId: string, cvc: string) {
    this.dialogRef.close({ event:'success', value: walletId , cvc: cvc });
  }
}
