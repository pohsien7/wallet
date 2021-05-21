import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03002Service } from '../f03002.service';
import { F03002confirmComponent } from '../f03002confirm/f03002confirm.component';

@Component({
  templateUrl: './f03002wopen.component.html',
  styleUrls: ['./f03002wopen.component.css']
})
export class F03002wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  constructor(public dialogRef: MatDialogRef<F03002wopenComponent>, private fb: FormBuilder, private f03002Service: F03002Service, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  totalCount: any;
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
      this.totalCount = data.size;
      this.myWalletSource.data = data.items;
      if ( this.totalCount == 0 ) {
        this.dialog.open(F03002confirmComponent, { data: { msgStr: "查無錢包" } });
      }
    });
  }

  goBack(recipientID: string,txnID: string) {
    this.dialogRef.close({ event:'success', recipientID: recipientID , txnID: txnID });
  }
}
