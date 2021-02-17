import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04002Service } from './f04002.service';
import { F04002addComponent } from './f04002add/f04002add.component';
import { F04002editComponent } from './f04002edit/f04002edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04002',
  templateUrl: './f04002.component.html',
  styleUrls: ['./f04002.component.css']
})
export class F04002Component implements OnInit, AfterViewInit {
  adrType: sysCode[] = [];
  adType: sysCode[] = [];
  selectedAdrValue: string;
  selectedAdValue: string;
  constructor(private f04002Service: F04002Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.f04002Service.getSysTypeCode('ADR_TYPE').subscribe(data => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.adrType.push({value: codeNo, viewValue: desc})
      }
    });
    this.f04002Service.getSysTypeCode('AD_TYPE').subscribe(data => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['code_NO'];
        const desc = jsonObj['code_DESC'];
        this.adType.push({value: codeNo, viewValue: desc})
      }
    });
  }
//============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  adrCodeSource = new MatTableDataSource<any>();
  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getAdrCode();
    });
  }

  changeSelect() {
    if (this.selectedAdrValue != 'R') { this.selectedAdValue = ''; }
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getAdrCode();
  }

  getAdrCode() {
    const adrVal = this.selectedAdrValue != null ? this.selectedAdrValue : '';
    const adVal = this.selectedAdValue != null ? this.selectedAdValue : '';
    this.f04002Service.getAdrCode(this.currentPage.pageIndex, this.currentPage.pageSize, adrVal, adVal).subscribe(data => {
      this.totalCount = data.size;
      this.adrCodeSource.data = data.items;
    });
  }

  addNew() {
    if (this.selectedAdrValue == null) {
      alert('請選擇：原因碼類別');

    } else if (this.selectedAdrValue == 'R' && (this.selectedAdValue == null || this.selectedAdValue == '')) {
      alert('請選擇：補件類別');

    } else {
      const dialogRef = this.dialog.open(F04002addComponent, {
        data: {
          reason_KIND: this.selectedAdrValue,
          ad_TYPE: this.selectedAdValue,
          reason_CODE : '',
          reason_DESC: '',
          reason_SORT: '',
          reason_FLAG: 'N'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'success') { this.refreshTable(); }
      });
    }
  }

  startEdit(i: number,
    reason_KIND: string, ad_TYPE: string, reason_CODE: string,
    reason_DESC: string, reason_SORT: string, reason_FLAG: string) {
      const dialogRef = this.dialog.open(F04002editComponent, {
        data: {
          reason_KIND: reason_KIND,
          ad_TYPE : ad_TYPE,
          reason_CODE: reason_CODE,
          reason_DESC: reason_DESC,
          reason_SORT: reason_SORT,
          reason_FLAG: reason_FLAG
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) { this.refreshTable(); }
      });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getAdrCode();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
