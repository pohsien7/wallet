import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F02015Service } from '../f02015.service';
import { F02015confirmComponent } from '../f02015confirm/f02015confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f02015wopen.component.html',
  styleUrls: ['./f02015wopen.component.css']
})
export class F02015wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    walletType: ['', [Validators.required]],
    walletID: ['', [ ]],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  walletOption: sysCode[] = [{value: 'AUTHORIZE', viewValue: 'AUTHORIZE'}];

  constructor(public dialogRef: MatDialogRef<F02015wopenComponent>, private fb: FormBuilder, private datePipe: DatePipe, private f02015Service: F02015Service, public dialog: MatDialog) { }

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
    this.f02015Service.getWalletIdList('/consumer/f02015fn01', jsonString).subscribe(data => {
      this.totalCount = data.size;
      this.walletIdSource.data = data.items;
      if ( this.totalCount == 0 ) {
        this.dialog.open(F02015confirmComponent, { data: { msgStr: "????????????" } });
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

  goBack(authID: string, operation: string, walletID: string) {
    this.dialogRef.close({ event:'success', authID: authID, operation: operation, walletID: walletID });
  }
}
