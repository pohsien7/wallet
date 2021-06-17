import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { F03010Service } from './f03010.service';
import { F03010confirmComponent } from './f03010confirm/f03010confirm.component';
import { F03010wopenComponent } from './f03010wopen/f03010wopen.component';
interface COMB {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03010',
  templateUrl: './f03010.component.html',
  styleUrls: ['./f03010.component.css', '../../assets/css/f03.css']
})
export class F03010Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  cvcCode: COMB[] = [{ value: '0901', viewValue: '0901' }, { value: 'R001', viewValue: 'R001' }, { value: 'R002', viewValue: 'R002' }];
  constructor(private fb: FormBuilder, public f03010Service: F03010Service, private datePipe: DatePipe, public dialog: MatDialog) { }

  queryForm: FormGroup = this.fb.group({
    walletID: ['', [Validators.required]],
    cvc: ['0901', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]],
    walletType: ['']
  });

  ngOnInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: 5
    };
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
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
  ledgerStateListData = new MatTableDataSource<any>();

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
  submitted = false;

  async onSubmit() {
    this.submitted = true;
    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
      length: null
    };
    this.paginator.firstPage();
    this.getViewDataList();
  }

  async getViewDataList() {
    if (this.queryForm.value.dn == '' && this.queryForm.value.name == '' &&
      this.queryForm.value.startTime == '' && this.queryForm.value.endTime == '' &&
      this.queryForm.value.ban == '' && this.queryForm.value.owner == ''
    ) {
    } else {
      let msg = '';
      this.submitted = true;
      //處理日期
      if (this.dateControlEnd.value - this.dateControlStart.value < 0) {
        msg = '開始日期不能大於結束日期';
        this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } })
      } else if (this.dateControlMinMax.value - this.dateControlEnd.value < 0 || this.dateControlMinMax.value - this.dateControlStart.value < 0) {
        msg = '日期不能超過現在時間';
        this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } })
      } else {
        let jsonStr = JSON.stringify(this.queryForm.value);
        let jsonObj = JSON.parse(jsonStr);
        //let startTime = new Date(this.queryForm.value.startTime);
        //let endTime = new Date(this.queryForm.value.endTime);
        let startTime = new Date(this.dateControlStart.value);
        let endTime = new Date(this.dateControlEnd.value);
        jsonObj.startTime = this.datePipe.transform(startTime, "yyyy-MM-dd HH:mm");
        jsonObj.endTime = this.datePipe.transform(endTime, "yyyy-MM-dd HH:mm");
        //處理分頁
        let pgIndex = `${this.currentPage.pageIndex + 1}`;
        let pgSize = `${this.currentPage.pageSize}`;
        jsonObj.pageIndex = pgIndex;
        jsonObj.pageSize = pgSize;

        const formdata: FormData = new FormData();
        formdata.append('value', JSON.stringify(jsonObj));
        await this.f03010Service.sendConsumer('consumer/f03010', formdata).then((data) => {
          if (data.listIndex == "error") {
            this.dialog.open(F03010confirmComponent, { data: { msgStr: "查無紀錄" } })
          } else if (data.listIndex == "IDerror") {
            this.dialog.open(F03010confirmComponent, { data: { msgStr: "錢包ID有誤" } })
          } else if (data.listIndex == "timeerror") {
            this.dialog.open(F03010confirmComponent, { data: { msgStr: "請填寫時間" } })
          } else {
            this.ledgerStateListData = data.listIndex;
            this.totalCount = data.length;
          }
        });
      }
    }
  }

  getList() {
    const dialogRef = this.dialog.open(F03010wopenComponent, {
      data: { queryWalletID: this.queryForm.value.queryWalletID },
      minHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.queryForm.patchValue({ walletID: result.value });
        this.queryForm.patchValue({ walletType: result.walletType });
      }
    });
  }

  setTimes() {
    if (this.queryForm.value.endTime == null) {
      this.queryForm.patchValue({ endTime: this.queryForm.value.startTime });
    }
  }

  clear() {
    this.queryForm.patchValue({
      walletID: '', startTime: '', endTime: '', walletType: ''
    });
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null,
    };
    this.totalCount = 0;
    this.paginator.firstPage();
    this.ledgerStateListData.data = null;
    this.paginator._changePageSize(5);
    this.dateControlStart = new FormControl(new Date());
    this.dateControlEnd = new FormControl(new Date());
  }

  //time test
  public dateControlStart = new FormControl(new Date());
  public dateControlEnd = new FormControl(new Date());
  public dateControlMinMax = new FormControl(new Date());
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public touchUi = false;
  public color: ThemePalette = 'primary';
}
