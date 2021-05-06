import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { F04001Service } from './f04001.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { F04001confirmComponent } from './f04001confirm/f04001confirm.component';


interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04001',
  templateUrl: './f04001.component.html',
  styleUrls: ['./f04001.component.css', '../../assets/css/f04.css']
})
export class F04001Component implements OnInit, AfterViewInit {

  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.maxLength(100)]],
    ban: ['', [Validators.maxLength(10)]],
    owner: ['', [Validators.maxLength(50)]],
    createdate_start: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    createdate_end: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  // $validator = Validator::make($request->all(), [
  //   "names"    => "nullable|required_with:price.*|string",
  //   "names.*"  => "required|string|distinct|min:3"
  // ]);

  submitted = false;

  dn: string;
  name: string;
  ban: string;
  owner: string;
  createdate_start: string;
  createdate_end: string;
  dnVal: string;
  nameVal: string;
  banVal: string;
  ownerVal: string;
  creatdateStartVal: string;
  creatdateEndVal: string;
  phonenumberVal: string;
  mccVal: string;
  addressVal: string;
  walletidVal: string;
  useridVal: string;


  constructor(private fb: FormBuilder, public f04001Service: F04001Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {

    // this.getViewDataList();
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.value.dn == '' &&
    this.registrationForm.value.name == '' &&
    this.registrationForm.value.ban == '' &&
    this.registrationForm.value.owner == '' &&
    this.registrationForm.value.createdate_start == '') {
      this.dialog.open(F04001confirmComponent, { data: { msgStr: '請選擇一項查詢!' } });
      return false;
    } else {
      this.currentPage = {
        pageIndex: 0,
        pageSize: 5,
        length: null
      };
      this.paginator.firstPage();
      this.getViewDataList();
    }
  }


  //================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  jpWalletCert = new MatTableDataSource<any>();

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
      this.getViewDataList();
    });

  }



  //================================================================

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.jpWalletCert.filter = filterValue.trim().toLowerCase();
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getViewDataList();
  }

  getViewDataList() {
    if (this.registrationForm.value.dn == '' && this.registrationForm.value.name == '' &&
      this.registrationForm.value.createdate_start == '' && this.registrationForm.value.createdate_end == '' &&
      this.registrationForm.value.ban == '' && this.registrationForm.value.owner == ''
    ) {

    } else {
      let jsonStr = JSON.stringify(this.registrationForm.value);
      let jsonObj = JSON.parse(jsonStr);
      console.log(this.registrationForm.value.createdate_start)

      if (this.registrationForm.value.createdate_start != null && this.registrationForm.value.createdate_start != '' &&
        this.registrationForm.value.createdate_end != null && this.registrationForm.value.createdate_end != '') {
        // 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
        let startDate = new Date(this.registrationForm.value.createdate_start);
        let endDate = new Date(this.registrationForm.value.createdate_end);


        jsonObj.createdate_start = this.datePipe.transform(startDate, "yyyy-MM-dd");
        jsonObj.createdate_end = this.datePipe.transform(endDate, "yyyy-MM-dd");
      }
      let pgIndex = `${this.currentPage.pageIndex + 1}`;
      let pgSize = `${this.currentPage.pageSize}`;
      jsonObj.pageIndex = pgIndex;
      jsonObj.pageSize = pgSize;
      console.log(pgIndex)
      console.log(pgSize)
      const formdata: FormData = new FormData();
      formdata.append('value', JSON.stringify(jsonObj));

      this.f04001Service.sendConsumer('consumer/f04001', formdata).then(data => {
        console.log(data.dataMap)
        console.log(data.totalCount)

        if ( data.totalCount == 0 ) {
          this.cleanToEmpty();
          return this.dialog.open(F04001confirmComponent, { data: { msgStr: '未查詢到相關錢包，請填寫正確查詢資料!' } });
        }

        this.totalCount = data.totalCount;
        this.jpWalletCert.data = data.dataMap;
      });

      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
  setTimes() {
    if (this.registrationForm.value.createdate_end == null) {
      this.registrationForm.patchValue({ createdate_end: this.registrationForm.value.createdate_start });
      //this.testForm.setValue({endTime:this.testForm.value.startTime});
    }
  }

  cleanToEmpty() {
    this.registrationForm.patchValue({ dn: '' });
    this.registrationForm.patchValue({ name: '' });
    this.registrationForm.patchValue({ createdate_start: '' });
    this.registrationForm.patchValue({ createdate_end: '' });
    this.registrationForm.patchValue({ ban: '' });
    this.registrationForm.patchValue({ owner: '' });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.jpWalletCert.data = null;
  }

}
