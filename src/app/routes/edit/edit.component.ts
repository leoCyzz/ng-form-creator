import { Component, OnInit } from '@angular/core';
import { PageConfig, IPage } from 'app/model/page';

@Component({
  selector: 'fb-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  pageConfig: IPage;
  translation: any;
  selectorCompParams: any;
  constructor() { }

  ngOnInit() {
    this.pageConfig = new PageConfig();
    this.translation = {};
  }

  onComponentSelect(e: any) {
    this.selectorCompParams = e;
  }
}
