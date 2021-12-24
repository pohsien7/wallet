import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03011Service } from '../f03011.service';
import { F03011confirmComponent } from '../f03011confirm/f03011confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  templateUrl: './f03011wopen.component.html',
  styleUrls: ['./f03011wopen.component.css']
})
export class F03011wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    transType: [''],
    walletid:[''],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  walletOption: sysCode[] = [{value: 'myWallet_transfer', viewValue: 'Wallet_Transfer'},
                              {value: 'VaultTransfer', viewValue: 'Vault_Transfer'},
                              {value: 'Deduct', viewValue: 'Deduct'},
                              {value: 'BarcodePay', viewValue: 'BarcodePay'},
                              {value: 'NumberPay', viewValue: 'NumberPay'},
                              {value: 'IssueCV', viewValue: 'IssueCV'},
                              {value: 'RedeemCV', viewValue: 'RedeemCV'},
                              {value: 'ReturnCV', viewValue: 'ReturnCV'}
                              ];
  constructor(public dialogRef: MatDialogRef<F03011wopenComponent>, private fb: FormBuilder, private datePipe: DatePipe, private f03011Service: F03011Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  walletIdSource = new MatTableDataSource<any>();

  transType :string;

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

    this.searchForm.patchValue({ transType : '' });

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

    const transType=  this.searchForm.value.transType;
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
    this.f03011Service.getWalletIdList('/consumer/f03011fn01', jsonString).subscribe(data => {
      this.transType = transType;
      this.totalCount = data.size;
      this.walletIdSource.data = data.items;
      if ( this.totalCount == 0 ) {
        this.dialog.open(F03011confirmComponent, { data: { msgStr: "查無錢包" } });
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

  goBack(walletId: string, txnID: string, cvc: string, transType:String) {
    this.dialogRef.close({ event:'success', value: walletId , txnID: txnID, cvc: cvc, valueTransType: this.searchForm.value.transType });
  }
}
