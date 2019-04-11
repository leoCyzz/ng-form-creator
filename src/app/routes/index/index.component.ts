import { Component, OnInit } from '@angular/core';
import { FormCreatorHttpService } from '@core/net/form-creator-http.service';

@Component({
  selector: 'fc-index',
  templateUrl: './index.component.html'
})

export class IndexComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  pageList: any = [];
  loading = true;
  searchValue = '';

  constructor(
    private fcHttp: FormCreatorHttpService
  ) { }

  ngOnInit() {
    this.getPageList();
  }

  getPageList(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.fcHttp.getPageList(this.searchValue, this.pageIndex, this.pageSize)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.loading = false;
          this.total = res.total;
          this.pageList = res.pageList;
        }
    });
  }

  onClearSearchInput() {
    this.searchValue = '';
    this.getPageList(true);
  }
}
