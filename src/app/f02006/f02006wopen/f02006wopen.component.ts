import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F02006Service } from '../f02006.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './f02006wopen.component.html',
  styleUrls: ['./f02006wopen.component.css']
})
export class F02006wopenComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup = this.fb.group({
    transType: ['', [Validators.required]],
    recipientid: ['', []],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });


  walletOption: sysCode[] = [{value: 'myWallet_transfer', viewValue: 'Transfer'},
                             {value: 'Deduct', viewValue: 'Deduct'},
                             {value: 'BarcodePay', viewValue: 'BarcodePay'},
                             {value: 'NumberPay', viewValue: 'NumberPay'},
                             {value: 'IssueCV', viewValue: 'IssueCV'},
                             {value: 'RedeemCV', viewValue: 'RedeemCV'},
                             {value: 'Reverse', viewValue: 'Reverse'}
                            ];

  constructor(public dialogRef: MatDialogRef<F02006wopenComponent>, private fb: FormBuilder, private datePipe: DatePipe, private f02006Service: F02006Service) { }

  ngOnInit(): void {

  }

//============================================================
  totalCount: any;
  type2: any;
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
      this.getTxnId();
    });
  }

  cleanToEmpty() {
    // this.searchForm.patchValue({ walletType : '' });
    // this.searchForm.patchValue({ startTime : '' });
    // this.searchForm.patchValue({ endTime : '' });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.walletIdSource.data = null;
  }

  async getTxnId() {
    let jsonStr :string = JSON.stringify(this.searchForm.value);
    let jsonObj = JSON.parse(jsonStr);
    //1.處理日期
    // if (this.searchForm.value.startTime != '' && this.searchForm.value.endTime != '') {
    //   let selectedStartDate = new Date(this.searchForm.value.startTime);
    //   let selectedEndDate = new Date(this.searchForm.value.endTime);
    //   jsonObj.startTime = this.datePipe.transform(selectedStartDate,"yyyy-MM-dd");
    //   jsonObj.endTime = this.datePipe.transform(selectedEndDate,"yyyy-MM-dd");
    // }
    //2.處理分頁
    let page :string = `${this.currentPage.pageIndex + 1}`;
    let perPage :string = `${this.currentPage.pageSize}`;
    jsonObj.page = page;
    jsonObj.perPage = perPage;
    //3.轉回字串
    let jsonString :string = JSON.stringify(jsonObj);
    this.f02006Service.getWalletIdList('/consumer/f02006fn01', jsonString).subscribe(data => {
      this.type2 = data.type2;
      this.totalCount = data.size;
      this.walletIdSource.data = data.items;
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' : '';
  }

  setEndTimes() {
    // if (this.searchForm.value.startTime != null && this.searchForm.value.endTime == null) {
    //   this.searchForm.patchValue({ endTime:this.searchForm.value.startTime });
    // }
  }

  goBack(txnId: string, cvc: string, type2:string) {
    this.dialogRef.close({ event:'success', value: txnId , cvc: cvc , type2});
  }
}
