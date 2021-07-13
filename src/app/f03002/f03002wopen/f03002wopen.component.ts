import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03002Service } from '../f03002.service';
import { F03002confirmComponent } from '../f03002confirm/f03002confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  templateUrl: './f03002wopen.component.html',
  styleUrls: ['./f03002wopen.component.css']
})
export class F03002wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    transType: ['', [Validators.required]],
    recipientid: ['', [Validators.maxLength(23), Validators.minLength(23)]],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  transOption: sysCode[] = [{value: 'myWallet_transfer', viewValue: 'Transfer'},
                            {value: 'Deduct', viewValue: 'Deduct'},
                            {value: 'BarcodePay', viewValue: 'BarcodePay'},
                            {value: 'NumberPay', viewValue: 'NumberPay'},
                            {value: 'IssueCV', viewValue: 'IssueCV'},
                            {value: 'RedeemCV', viewValue: 'RedeemCV'}
                            ];

  constructor(public dialogRef: MatDialogRef<F03002wopenComponent>, private fb: FormBuilder, private f03002Service: F03002Service, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  totalCount: any;
  type2:any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  myWalletSource = new MatTableDataSource<any>();

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
      this.getMyWallet();
    });
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此為必填欄位!' : '';
  }

  async getMyWallet() {
    let jsonStr :string = JSON.stringify(this.searchForm.value);
    let jsonObj = JSON.parse(jsonStr);
    //2.處理分頁
    let page :string = `${this.currentPage.pageIndex + 1}`;
    let perPage :string = `${this.currentPage.pageSize}`;
    jsonObj.page = page;
    jsonObj.perPage = perPage;
    //3.轉回字串
    let jsonString :string = JSON.stringify(jsonObj);

    this.f03002Service.getWalletIdList('/consumer/f03002fn01', jsonString).subscribe(data => {
      this.type2 = data.type;
      this.totalCount = data.size;
      this.myWalletSource.data = data.items;
      if ( this.totalCount == 0 ) {
        this.dialog.open(F03002confirmComponent, { data: { msgStr: "查無錢包" } });
      }
    });
  }

  goBack(recipientID: string, txnID: string, cvc: string, type2:string) {
    this.dialogRef.close({ event:'success', recipientID: recipientID , txnID: txnID, cvc: cvc, type2:type2 });
  }

  cleanToEmpty() {
    this.searchForm.patchValue({ walletType : '' });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.myWalletSource.data = null;
  }
}
