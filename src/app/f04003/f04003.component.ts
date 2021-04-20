import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { F04003Service } from './f04003.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';


interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04003',
  templateUrl: './f04003.component.html',
  styleUrls: ['./f04003.component.css']
})
export class F04003Component implements OnInit, AfterViewInit {
  
  // 驗證範例 => https://stackblitz.com/edit/full-angular-reactive-forms-demo?file=src%2Fapp%2Fapp.component.ts
  registrationForm: FormGroup = this.fb.group({
    dn: ['', [Validators.maxLength(30)]],
    name: ['', [Validators.maxLength(50)]],
    idNumber: ['', [Validators.maxLength(10)]],
    phoneNumber: ['', [Validators.maxLength(30), Validators.pattern('^[0-9]+$')]],
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
  idNumber: string;
  phonenumber: string;
  createdate_start: string;
  createdate_end: string;
  dnVal: string;
  nameVal: string;
  idnumberVal: string;
  phonenumberVal: string;
  creatdateStartVal: string;
  creatdateEndVal: string;
  nationVal: string;
  genderVal: string;
  birthdayVal: string;
  addressVal: string;
  walletidVal: string;
  useridVal: string;
 

  constructor(private fb: FormBuilder, public f04003Service: F04003Service, private datePipe: DatePipe ) { }

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
    if(!this.registrationForm.valid) {
      alert('資料必填喔!')
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
      this.getViewDataList();
    });
  
  }

  

  //================================================================

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.npWalletPubkey.filter = filterValue.trim().toLowerCase();
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getViewDataList();
  }

  getViewDataList() {
    let jsonStr = JSON.stringify(this.registrationForm.value);
    let jsonObj = JSON.parse(jsonStr);
    console.log(this.registrationForm.value.createdate_start)

    if (jsonObj.createdate_start.createdate_start != null && 
      jsonObj.createdate_start.createdate_end != null) {
    // 當 JSON.stringify 遇上 angular material datepicker 時會有日期上的BUG,故轉成JSON物件後更換內容再轉成JSON字串
    let startDate = new Date(this.registrationForm.value.createdate_start);
    let endDate = new Date(this.registrationForm.value.createdate_end);
    
    
      jsonObj.createdate_start = this.datePipe.transform(startDate,"yyyy-MM-dd");
      jsonObj.createdate_end = this.datePipe.transform(endDate,"yyyy-MM-dd");
    }
    let pgIndex = `${this.currentPage.pageIndex + 1}`;
    let pgSize = `${this.currentPage.pageSize}`;
    jsonObj.pageIndex = pgIndex;
    jsonObj.pageSize = pgSize;
    console.log(pgIndex)
    console.log(pgSize)
    const formdata: FormData = new FormData();
    formdata.append('value', JSON.stringify(jsonObj));
    
    this.f04003Service.sendConsumer('consumer/f04003', formdata).then(data => {
      console.log(data.dataMap)
      console.log(data.totalCount)
      
      this.totalCount = data.totalCount;
      this.npWalletPubkey.data = data.dataMap;
    });

    console.log(JSON.stringify(this.registrationForm.value));
  }

}
