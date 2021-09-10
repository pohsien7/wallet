import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04010confirmComponent } from './f04010confirm/f04010confirm.component';
import { F04010Service } from './f04010.service';
import { F04010addComponent } from './f04010add/f04010add.component';
import { F04010EditComponent } from './f04010edit/f04010edit.component';


@Component({
  selector: 'app-f04010',
  templateUrl: './f04010.component.html',
  styleUrls: ['./f04010.component.css', '../../assets/css/f04.css']
})
export class F04010Component implements OnInit {


  cdbcMsgHistoryForm: FormGroup = this.fb.group({

  });

  constructor(private fb: FormBuilder, public f04010Service: F04010Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
   this.getViewDataList();
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  // getErrorMessage() {
  //   return this.formControl.hasError('required') ? '此為必填欄位!' : '';
  // }

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
    });
  }

  // isFieldEmpty() {
  //   if (this.cdbcMsgHistoryForm.value.userId == ''
  //   ) {
  //     return true;
  //   }
  // }

  getViewDataList() {
    let jsonStr = JSON.stringify(this.cdbcMsgHistoryForm.value);
    let jsonObj = JSON.parse(jsonStr);
    // 處理日期 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
    let startDate = this.cdbcMsgHistoryForm.value.createdate_start;
    let endDate = this.cdbcMsgHistoryForm.value.createdate_end;
    if (startDate != null && startDate != "" && endDate != null && endDate != "") {
      jsonObj.createdate_start = this.datePipe.transform(new Date(startDate), "yyyy-MM-dd");
      jsonObj.createdate_end = this.datePipe.transform(new Date(endDate), "yyyy-MM-dd");
    }
    //處理分頁
    let pgIndex = 1;
    let pgSize = 5;
    jsonObj.pageIndex = pgIndex;
    jsonObj.pageSize = pgSize;

    const formdata: FormData = new FormData();
    formdata.append('value', JSON.stringify(jsonObj));
    this.f04010Service.sendConsumer('consumer/f04010', formdata).then(data => {

      if (data.totalCount == 0) {
        this.clear();
        return this.dialog.open(F04010confirmComponent, { data: { msgStr: '查無資訊!' } });
      }

      this.totalCount = data.totalCount;
      this.cdbcMsgHistory.data = data.dataMap;
    });

  }

  setTimes() {
    if (this.cdbcMsgHistoryForm.value.createdate_end == null) {
      this.cdbcMsgHistoryForm.patchValue({ createdate_end: this.cdbcMsgHistoryForm.value.createdate_start });
    }
  }

  add() {
    const dialogRef = this.dialog.open(F04010addComponent, {
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getViewDataList();

    });

  }
  clear() {

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

  edit(id: string){
    const dialogRef = this.dialog.open(F04010EditComponent, {
      data:{
        id: id
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      this.getViewDataList();
    });
  }
}

