import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { F04006Service } from './f04006.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { F04006confirmComponent } from './f04006confirm/f04006confirm.component';
import { F04006shopComponent } from './f04006shop/f04006shop.component';
interface COMB {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f04006',
  templateUrl: './f04006.component.html',
  styleUrls: ['./f04006.component.css', '../../assets/css/f04.css']
})
export class F04006Component implements OnInit, AfterViewInit {
  cvcCode: COMB[];

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    cvc: ['', [Validators.maxLength(5)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  removeShopForm: FormGroup = this.fb.group({
    walletId: ['']
  });

  constructor(private fb: FormBuilder, public F04006Service: F04006Service, private datePipe: DatePipe, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.cvcCode = JSON.parse(sessionStorage.getItem('cvcCode'));

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
  npWalletPubkey = new MatTableDataSource<any>();

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
    if(this.registrationForm.value.cvc == ''
    ) {
      return true;
    }
  }

  getViewDataList() {
    if(this.isFieldEmpty()) {
      this.dialog.open(F04006confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      return;
    } else {
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      // 處理日期 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
      let issueCvValid = this.registrationForm.value.issueCvValid;

      if (issueCvValid != null) {
        jsonObj.issueCvValid = this.datePipe.transform(new Date(issueCvValid),"yyyy-MM-dd");
      }
      //處理分頁
      let pgIndex = `${this.currentPage.pageIndex + 1}`;
      let pgSize = `${this.currentPage.pageSize}`;
      jsonObj.pageIndex = pgIndex;
      jsonObj.pageSize = pgSize;

      const formdata: FormData = new FormData();
      console.log(jsonObj);
      formdata.append('value', JSON.stringify(jsonObj));
      this.F04006Service.sendConsumer('consumer/f04006', formdata).then(data => {

        if ( data.totalCount == 0 ) {
          this.clear();
          return this.dialog.open(F04006confirmComponent, { data: { msgStr: '查無此數位券!' } });
        }

        console.log(data.dataMap);
        this.totalCount = data.totalCount;
        this.npWalletPubkey.data = data.dataMap;
      });
    }
  }

  setTimes() {
    if (this.registrationForm.value.createdate_end == null) {
      this.registrationForm.patchValue({createdate_end:this.registrationForm.value.createdate_start});
    }
  }

  clear() {
    this.registrationForm.patchValue({
      cvc:''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.npWalletPubkey.data = null;
    this.paginator._changePageSize(5);
  }

  edit(cvc: string){
    const dialogRef = this.dialog.open(F04006shopComponent, {
      data:{
        cvc: cvc
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      this.clear();
    });
  }

}
