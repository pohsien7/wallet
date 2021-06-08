import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F02014Service } from '../f02014.service';
import { F02014confirmComponent } from '../f02014confirm/f02014confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f02014wopen',
  templateUrl: './f02014wopen.component.html',
  styleUrls: ['./f02014wopen.component.css']
})
export class F02014wopenComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    walletType: ['', [Validators.required]],
    startTime: ['', [ ]],
    endTime: ['', [ ]],
    dn: ['', [ ]],
    page: ['', [ ]],
    perPage: ['', [ ]]
  });

  walletOption: sysCode[] = [{value: 'NPWALLET_CERT', viewValue: '記名錢包 (自然人，憑證)'},
                             {value: 'NPWALLET_PUBKEY', viewValue: '記名錢包 (自然人，公鑰)'}];

  constructor(public dialogRef: MatDialogRef<F02014wopenComponent>, private fb: FormBuilder, private datePipe: DatePipe, private f02014Service: F02014Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  totalCount: any;
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
      this.getWalletId();
    });
  }

  cleanToEmpty() {
    this.searchForm.patchValue({ dn : '' });
    this.searchForm.patchValue({ walletType : '' });
    this.searchForm.patchValue({ startTime : '' });
    this.searchForm.patchValue({ endTime : '' });
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
    let jsonStr :string = JSON.stringify(this.searchForm.value);
    let jsonObj = JSON.parse(jsonStr);
    //1.處理日期
    if (this.searchForm.value.startTime != '' && this.searchForm.value.endTime != '') {
      let selectedStartDate = new Date(this.searchForm.value.startTime);
      let selectedEndDate = new Date(this.searchForm.value.endTime);
      jsonObj.startTime = this.datePipe.transform(selectedStartDate,"yyyy-MM-dd");
      jsonObj.endTime = this.datePipe.transform(selectedEndDate,"yyyy-MM-dd");
    }
    //2.處理分頁
    let page :string = `${this.currentPage.pageIndex + 1}`;
    let perPage :string = `${this.currentPage.pageSize}`;
    jsonObj.page = page;
    jsonObj.perPage = perPage;
    //3.轉回字串
    let jsonString :string = JSON.stringify(jsonObj);
    this.f02014Service.getWalletIdList('/consumer/f02014fn01', jsonString).subscribe(data => {
      this.totalCount = data.size;
      this.walletIdSource.data = data.items;
      console.log(data.items);
      if ( this.totalCount == 0 ) {
        this.dialog.open(F02014confirmComponent, { data: { msgStr: "查無錢包" } });
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

  goBack(walletID: string) {
    let name: string, idNumber: string, nation: string, gender: string, birthDate: string, phoneNumber: string, address: string;
    for (let index = 0; index < this.walletIdSource.data.length; index++) {
      console.log(this.walletIdSource.data[index].WALLETID);
      if (this.walletIdSource.data[index].WALLETID == walletID) {
        name = this.walletIdSource.data[index].NAME;
        idNumber = this.walletIdSource.data[index].IDNUMBER;
        nation = this.walletIdSource.data[index].NATION;
        gender = this.walletIdSource.data[index].GENDER;
        birthDate = this.walletIdSource.data[index].BIRTHDATE;
        phoneNumber = this.walletIdSource.data[index].PHONENUMBER;
        address = this.walletIdSource.data[index].ADDRESS;
      }
    }
    this.dialogRef.close(
      {
        event:'success',
        walletID: walletID,
        name: name,
        idNumber: idNumber,
        nation: nation,
        gender: gender,
        birthDate: birthDate,
        phoneNumber: phoneNumber,
        address: address,
        walletType: this.searchForm.value.walletType
      });
  }
}

