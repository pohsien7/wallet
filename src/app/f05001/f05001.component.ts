import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F05001Service } from './f05001.service';
import { F05001confirmComponent } from './f05001confirm/f05001confirm.component';
import { F05001wopenComponent } from './f05001wopen/f05001wopen.component';

@Component({
  selector: 'app-f05001',
  templateUrl: './f05001.component.html',
  styleUrls: ['./f05001.component.css', '../../assets/css/f04.css']
})
export class F05001Component implements OnInit {
  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  myWalletTransferForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.maxLength(25)]],
    recipientID: ['', [Validators.maxLength(25)]],
    txntime_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    txntime_end: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  constructor(private fb: FormBuilder, public f05001Service: F05001Service, private datePipe: DatePipe, public dialog: MatDialog ) { }

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
  myWalletTransferData = new MatTableDataSource<any>();

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
    if(this.myWalletTransferForm.value.walletID == '' && this.myWalletTransferForm.value.recipientID == ''
      && this.myWalletTransferForm.value.txntime_start =='' && this.myWalletTransferForm.value.txntime_end ==''
    ) {
      return true;
    }
  }

  getViewDataList() {
    if(this.isFieldEmpty()) {
      this.dialog.open(F05001confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      return;
    } else {

      let jsonStr = JSON.stringify(this.myWalletTransferForm.value);
      let jsonObj = JSON.parse(jsonStr);
      // 處理日期  當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let startDate = this.myWalletTransferForm.value.txntime_start;
      let endDate = this.myWalletTransferForm.value.txntime_end;
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
      this.f05001Service.sendConsumer('consumer/f05001', formdata).then(data => {

        if ( data.totalCount == 0 ) {
          this.clear();
          this.dialog.open(F05001confirmComponent, { data: { msgStr: '未查詢到相關錢包，請填寫正確查詢資料!' } });
          return;
        }

        this.totalCount = data.totalCount;
        this.myWalletTransferData.data = data.items;
      
      });
    }
  }

  setTimes() {
    if (this.myWalletTransferForm.value.txntime_end == null) {
      this.myWalletTransferForm.patchValue({txntime_end:this.myWalletTransferForm.value.txntime_start});
    }
  }

  getList() {
    const dialogRef = this.dialog.open(F05001wopenComponent, {
      data: { walletID: this.myWalletTransferForm.value.walletid },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.myWalletTransferForm.patchValue({ walletID: result.value });
        this.myWalletTransferForm.patchValue({ recipientID: result.recipientID });
      }
    });
  }

  clear() {
    this.myWalletTransferForm.patchValue({
      walletID:'', recipientID:'', txntime_start:'', txntime_end:''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.myWalletTransferData.data = null;
    this.paginator._changePageSize(5);
  }
}
