import { Component, OnInit } from '@angular/core';
import { PageConfig, IPage } from 'src/app/model/page';

@Component({
  selector: 'fb-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  pageConfig: IPage;
  selectorCompParams: any;
  constructor() { }

  ngOnInit() {
    this.pageConfig = new PageConfig();
  }

  onComponentSelect(e: any) {
    this.selectorCompParams = e;
  }
}
