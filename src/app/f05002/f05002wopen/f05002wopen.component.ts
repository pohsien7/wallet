import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F05002Service } from '../f05002.service';
import { F05002confirmComponent } from '../f05002confirm/f05002confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  templateUrl: './f05002wopen.component.html',
  styleUrls: ['./f05002wopen.component.css']
})
export class F05002wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    transType: ['', [Validators.required]],
    startTime: ['', [ ]],
    endTime: ['', [ ]],
    dn: ['', [ ]],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  walletOption: sysCode[] = [{value: 'reverse', viewValue: 'REVERSE'}];
  constructor(public dialogRef: MatDialogRef<F05002wopenComponent>, private fb: FormBuilder, private datePipe: DatePipe, private f05002Service: F05002Service, public dialog: MatDialog) { }

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
    this.searchForm.patchValue({ dn : '' });
    this.searchForm.patchValue({ transType : '' });
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
    //1.處理日期
    if (this.searchForm.value.startTime != '' && this.searchForm.value.endTime != '') {
      let selectedStartDate = new Date(this.searchForm.value.startTime);
      let selectedEndDate = new Date(this.searchForm.value.endTime);
      jsonObj.startTime = this.datePipe.transform(selectedStartDate,"yyyy-MM-dd");
      jsonObj.endTime = this.datePipe.transform(selectedEndDate,"yyyy-MM-dd");
    }
    //2.處理分頁
    let page :string = `${this.currentPage.pageIndex + 1}`;
    let perPage :string = `${this.currentPage.pageSize}`;
    jsonObj.page = page;
    jsonObj.perPage = perPage;
    //3.轉回字串
    let jsonString :string = JSON.stringify(jsonObj);
    this.f05002Service.getWalletIdList('/consumer/f05002fn01', jsonString).subscribe(data => {
      this.totalCount = data.size;
      this.walletIdSource.data = data.items;
      if ( this.totalCount == 0 ) {
        this.dialog.open(F05002confirmComponent, { data: { msgStr: "查無錢包" } });
      }
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' : '';
  }

  setEndTimes() {
    if (this.searchForm.value.startTime != null && this.searchForm.value.endTime == null) {
      this.searchForm.patchValue({ endTime:this.searchForm.value.startTime });
    }
  }

  goBack(walletID: string, stxnID: string) {
    this.dialogRef.close({ event:'success', value: walletID , stxnID: stxnID });
  }
}
