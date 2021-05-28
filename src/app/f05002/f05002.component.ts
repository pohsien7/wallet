import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F05002Service } from './f05002.service';
import { F05002confirmComponent } from './f05002confirm/f05002confirm.component';
import { F05002wopenComponent } from './f05002wopen/f05002wopen.component';

@Component({
  selector: 'app-f05002',
  templateUrl: './f05002.component.html',
  styleUrls: ['./f05002.component.css', '../../assets/css/f04.css']
})
export class F05002Component implements OnInit {
  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  reverseSearchForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.maxLength(25)]],
    stxnID: ['', [Validators.maxLength(43)]],
    txntime_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    txntime_end: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  constructor(private fb: FormBuilder, public f05002Service: F05002Service, private datePipe: DatePipe, public dialog: MatDialog ) { }

  ngOnInit(): void {

  }

  formControl = new FormControl('', [
    Validators.required
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
  reversesearchData = new MatTableDataSource<any>();

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
      if(!this.isFieldEmpty()) { this.getViewDataList(); }
    });

  }

  isFieldEmpty() {
    if(this.reverseSearchForm.value.walletID == '' && this.reverseSearchForm.value.stxnID == ''
      && this.reverseSearchForm.value.txntime_start =='' && this.reverseSearchForm.value.txntime_end ==''
    ) {
      return true;
    }
  }

  getViewDataList() {
    if(this.isFieldEmpty()) {
      this.dialog.open(F05002confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      return;
    } else {

    let jsonStr = JSON.stringify(this.reverseSearchForm.value);
    let jsonObj = JSON.parse(jsonStr);
    // 處理日期  當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
    let startDate = this.reverseSearchForm.value.txntime_start;
    let endDate = this.reverseSearchForm.value.txntime_end;
    if (startDate != null && startDate != "" && endDate != null && endDate != "") {
      jsonObj.txntime_start = this.datePipe.transform(new Date(startDate),"yyyy-MM-dd");
      jsonObj.txntime_end = this.datePipe.transform(new Date(endDate),"yyyy-MM-dd");
    }
    // 處理分頁
    let pgIndex = `${this.currentPage.pageIndex + 1}`;
    let pgSize = `${this.currentPage.pageSize}`;
    jsonObj.pageIndex = pgIndex;
    jsonObj.pageSize = pgSize;

    const formdata: FormData = new FormData();
    formdata.append('value', JSON.stringify(jsonObj));
    this.f05002Service.sendConsumer('consumer/f05002', formdata).then(data => {

      if ( data.totalCount == 0 ) {
        this.clear();
        return this.dialog.open(F05002confirmComponent, { data: { msgStr: '未查詢到相關錢包，請填寫正確查詢資料!' } });
      }

      this.totalCount = data.totalCount;
      this.reversesearchData.data = data.items;
    });
  }
  }

  setTimes() {
    if (this.reverseSearchForm.value.txntime_end == null) {
      this.reverseSearchForm.patchValue({txntime_end:this.reverseSearchForm.value.txntime_start});
    }
  }

  getList() {
    const dialogRef = this.dialog.open(F05002wopenComponent, {
      data: { walletID: this.reverseSearchForm.value.walletid },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.reverseSearchForm.patchValue({ walletID: result.value });
        this.reverseSearchForm.patchValue({ stxnID: result.stxnID });
      }
    });
  }

  clear() {
    this.reverseSearchForm.patchValue({
      walletID:'', stxnID:'', txntime_start:'', txntime_end:''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.reversesearchData.data = null;
    this.paginator._changePageSize(5);
  }
}
