import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn13Service } from './f01001scn13.service';
import { ShowComponent } from './show/show.component';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'app-f01001scn13',
  templateUrl: './f01001scn13.component.html',
  styleUrls: ['./f01001scn13.component.css']
})
export class F01001scn13Component implements OnInit, AfterViewInit {
  accept: string = "image/*";

  fileControl: FormControl;
  public files: any;
  maxSize: number = 16;
  constructor(private route: ActivatedRoute, private router: Router, private f01001scn13Service: F01001scn13Service, public dialog: MatDialog) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }
  private applno: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });

    this.fileControl.valueChanges.subscribe((files: any) => {
        this.files = files;
    });
  }

  getApplno(): String {
    return this.applno;
  }
//===========================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  webInfoSource = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getWebInfo();
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
      this.getWebInfo();
    });
  }

  getWebInfo() {
    this.f01001scn13Service.getWebInfo().subscribe(data => {
      this.totalCount = data.size;
      this.webInfoSource.data = data.items;
    });

  }

  openView(web_img: any) {
    let base64String = 'data:image/jpeg;base64,' + web_img;
    const dialogRef = this.dialog.open(ShowComponent, {
      data: { base64Str: base64String }
    });
  }

  uploadFileToCE() {
    if (this.files != null) {

      const formdata = new FormData();
      formdata.append('file', this.files);
      this.f01001scn13Service.uploadFileToCE(formdata).subscribe(data => {

      });

    } else {
      alert('請至少選擇1個檔案!');
    }
  }
}
