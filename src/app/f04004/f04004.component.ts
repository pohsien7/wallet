import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04004Service } from './f04004.service';
import { F04004confirmComponent } from './f04004confirm/f04004confirm.component';

@Component({
  selector: 'app-f04004',
  templateUrl: './f04004.component.html',
  styleUrls: ['./f04004.component.css', '../../assets/css/f04.css']
})
export class F04004Component implements OnInit {
  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    phoneNumber: ['', [Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
    createdate_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    createdate_end: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  constructor(private fb: FormBuilder, public f04004Service: F04004Service, private datePipe: DatePipe, public dialog: MatDialog ) { }

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
  anonymousWalletData = new MatTableDataSource<any>();

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
    if(this.registrationForm.value.dn == '' && this.registrationForm.value.phoneNumber == ''
      && this.registrationForm.value.createdate_start =='' && this.registrationForm.value.createdate_end ==''
    ) {
      return true;
    }
  }

  getViewDataList() {
    if(this.isFieldEmpty()) {
      this.dialog.open(F04004confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      return;
    } else {

    let jsonStr = JSON.stringify(this.registrationForm.value);
    let jsonObj = JSON.parse(jsonStr);
    // 處理日期  當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
    let startDate = this.registrationForm.value.createdate_start;
    let endDate = this.registrationForm.value.createdate_end;
    if (startDate != null && startDate != "" && endDate != null && endDate != "") {
      jsonObj.createdate_start = this.datePipe.transform(new Date(startDate),"yyyy-MM-dd");
      jsonObj.createdate_end = this.datePipe.transform(new Date(endDate),"yyyy-MM-dd");
    }
    // 處理分頁
    let pgIndex = `${this.currentPage.pageIndex + 1}`;
    let pgSize = `${this.currentPage.pageSize}`;
    jsonObj.pageIndex = pgIndex;
    jsonObj.pageSize = pgSize;

    const formdata: FormData = new FormData();
    formdata.append('value', JSON.stringify(jsonObj));
    this.f04004Service.sendConsumer('consumer/f04004', formdata).then(data => {

      if ( data.totalCount == 0 ) {
        this.clear();
        return this.dialog.open(F04004confirmComponent, { data: { msgStr: '未查詢到相關錢包，請填寫正確查詢資料!' } });
      }

      this.totalCount = data.totalCount;
      this.anonymousWalletData.data = data.dataMap;
    });
  }
  }

  setTimes() {
    if (this.registrationForm.value.createdate_end == null) {
      this.registrationForm.patchValue({createdate_end:this.registrationForm.value.createdate_start});
    }
  }
  clear() {
    // this.registrationForm.reset();
    // this.registrationForm.setValue({
    this.registrationForm.patchValue({
      dn:'', name:'', idNumber:'', phoneNumber:'',
      createdate_start:'', createdate_end:''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.anonymousWalletData.data = null;
    this.paginator._changePageSize(5);
  }
}
