import { F04005Service } from './f04005.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04005confirmComponent } from './f04005confirm/f04005confirm.component';

@Component({
  selector: 'app-f04005',
  templateUrl: './f04005.component.html',
  styleUrls: ['./f04005.component.css', '../../assets/css/f04.css']
})
export class F04005Component implements OnInit {

  cdbcUserInfoForm: FormGroup = this.fb.group({
    userID: ['', [Validators.maxLength(30)]],
    userName: ['', [Validators.maxLength(18)]],
    userPid: ['', [Validators.maxLength(10)]],
    userPhone: ['', [Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    createdate_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    createdate_end: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  cdbcUserInfoShopForm: FormGroup = this.fb.group({
    userId: ['']
  });

  constructor(private fb: FormBuilder, public f04005Service: F04005Service, private datePipe: DatePipe, public dialog: MatDialog) { }

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
  cdbcUserInfo = new MatTableDataSource<any>();

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
      // if (!this.isFieldEmpty()) { this.getViewDataList(); }
      this.getViewDataList();
    });
  }

  isFieldEmpty() {
    if (this.cdbcUserInfoForm.value.userID == '' && this.cdbcUserInfoForm.value.userName == '' && this.cdbcUserInfoForm.value.userPid == ''
      && this.cdbcUserInfoForm.value.userPhone == '' && this.cdbcUserInfoForm.value.createdate_start == '' && this.cdbcUserInfoForm.value.createdate_end == ''
    ) {
      return true;
    }
  }

  getViewDataList() {
    // if (1 !=1) {
      // this.dialog.open(F04005confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      // return;
    // } else {

      let jsonStr = JSON.stringify(this.cdbcUserInfoForm.value);
      let jsonObj = JSON.parse(jsonStr);
      // 處理日期 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let startDate = this.cdbcUserInfoForm.value.createdate_start;
      let endDate = this.cdbcUserInfoForm.value.createdate_end;
      if (startDate != null && startDate != "" && endDate != null && endDate != "") {
        jsonObj.createdate_start = this.datePipe.transform(new Date(startDate), "yyyy-MM-dd");
        jsonObj.createdate_end = this.datePipe.transform(new Date(endDate), "yyyy-MM-dd");
      }
      //處理分頁
      let pgIndex = `${this.currentPage.pageIndex + 1}`;
      let pgSize = `${this.currentPage.pageSize}`;
      jsonObj.pageIndex = pgIndex;
      jsonObj.pageSize = pgSize;

      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));
      this.f04005Service.sendConsumer('consumer/f04005', formdata).then(data => {

        if (data.totalCount == 0) {
          this.clear();
          return this.dialog.open(F04005confirmComponent, { data: { msgStr: '未查詢到相關錢包，請填寫正確查詢資料!' } });
        }

        this.totalCount = data.totalCount;
        this.cdbcUserInfo.data = data.dataMap;
      });
    // }
  }

  setTimes() {
    if (this.cdbcUserInfoForm.value.createdate_end == null) {
      this.cdbcUserInfoForm.patchValue({ createdate_end: this.cdbcUserInfoForm.value.createdate_start });
    }
  }

  clear() {
    this.cdbcUserInfoForm.patchValue({
      userID: '', userName: '', userPid: '', userPhone: '',
      createdate_start: '', createdate_end: ''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.cdbcUserInfo.data = null;
    this.paginator._changePageSize(5);
  }

  getSetShop(userId: string) {

    this.cdbcUserInfoShopForm.patchValue({ userId: userId });
    let jsonStr = JSON.stringify(this.cdbcUserInfoShopForm.value);
    let jsonObj = JSON.parse(jsonStr);
    const formdata: FormData = new FormData();
    formdata.append('value', JSON.stringify(jsonObj));
    this.f04005Service.sendConsumer('consumer/f04005Shop', formdata).then(data => {
      const dialogRef = this.dialog.open(F04005confirmComponent, { data: { msgStr: data.result } });
      dialogRef.afterClosed().subscribe(result => {
        this.clear();
      });
    });
  }

  async getRemoveShop(userId: string){
    const dialogRef = this.dialog.open(F04005confirmComponent, { data: { msgStr: "check", userId: userId} });
    dialogRef.afterClosed().subscribe(result => {
      this.clear();
    });
  }
}
