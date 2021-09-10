import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04009confirmComponent } from './f04009confirm/f04009confirm.component';
import { F04009Service } from './f04009.service';

@Component({
  selector: 'app-f04009',
  templateUrl: './f04009.component.html',
  styleUrls: ['./f04009.component.css', '../../assets/css/f04.css']
})
export class F04009Component implements OnInit {


  cdbcMsgHistoryForm: FormGroup = this.fb.group({
    createdate_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    createdate_end: ['', [Validators.maxLength(10), Validators.minLength(10)]]
    // userName: ['', [Validators.maxLength(18)]],
    // userPid: ['', [Validators.maxLength(10)]],
    // userPhone: ['', [Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    // createdate_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    // createdate_end: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    // pageIndex: ['', [Validators.maxLength(3)]],
    // pageSize: ['', [Validators.maxLength(3)]]
  });


  constructor(private fb: FormBuilder, public f04009Service: F04009Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' : '';
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  cdbcMsgHistory = new MatTableDataSource<any>();

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
      if (!this.isFieldEmpty()) { this.getViewDataList(); }

    });
  }

  isFieldEmpty() {
    if (this.cdbcMsgHistoryForm.value.createdate_start == '' || this.cdbcMsgHistoryForm.value.createdate_end == ''
    ) {
      return true;
    }
  }

  getViewDataList() {
    if (this.isFieldEmpty()) {
      this.dialog.open(F04009confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      return;
    } else {

      let jsonStr = JSON.stringify(this.cdbcMsgHistoryForm.value);
      let jsonObj = JSON.parse(jsonStr);
      // 處理日期 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      // let startDate = this.cdbcMsgHistoryForm.value.createdate_start;
      // let endDate = this.cdbcMsgHistoryForm.value.createdate_end;
      // if (startDate != null && startDate != "" && endDate != null && endDate != "") {
      //   jsonObj.createdate_start = this.datePipe.transform(new Date(startDate), "yyyy-MM-dd");
      //   jsonObj.createdate_end = this.datePipe.transform(new Date(endDate), "yyyy-MM-dd");
      // }
      //處理分頁
      let pgIndex = `${this.currentPage.pageIndex + 1}`;
      let pgSize = `${this.currentPage.pageSize}`;
      jsonObj.pageIndex = pgIndex;
      jsonObj.pageSize = pgSize;

      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f04009Service.sendConsumer('consumer/f04009', formdata).then(data => {

        if (data.totalCount == 0) {
          this.clear();
          return this.dialog.open(F04009confirmComponent, { data: { msgStr: '查無資訊!' } });
        }

        this.totalCount = data.totalCount;
        this.cdbcMsgHistory.data = data.dataMap;
      });
    }
  }

  setTimes() {
    if (this.cdbcMsgHistoryForm.value.createdate_end == null) {
      this.cdbcMsgHistoryForm.patchValue({ createdate_end: this.cdbcMsgHistoryForm.value.createdate_start });
    }
  }

  clear() {
    this.cdbcMsgHistoryForm.patchValue({
      createdate_start: '',
      createdate_end:''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.cdbcMsgHistory.data = null;
    this.paginator._changePageSize(5);
  }

  // getSetShop(userId: string) {

  //   this.cdbcUserInfoShopForm.patchValue({ userId: userId });
  //   let jsonStr = JSON.stringify(this.cdbcUserInfoShopForm.value);
  //   let jsonObj = JSON.parse(jsonStr);
  //   const formdata: FormData = new FormData();
  //   formdata.append('value', JSON.stringify(jsonObj));
  //   this.f04009Service.sendConsumer('consumer/f04009Shop', formdata).then(data => {
  //     const dialogRef = this.dialog.open(F04009confirmComponent, { data: { msgStr: data.result } });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.clear();
  //     });
  //   });
  // }

  // async getRemoveShop(userId: string){
  //   const dialogRef = this.dialog.open(F04009confirmComponent, { data: { msgStr: "check", userId: userId} });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.clear();
  //   });
  // }
}

