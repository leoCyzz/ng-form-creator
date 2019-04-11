import { Component, OnInit } from '@angular/core';
import { PageConfig, IPage } from 'app/model/page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fc-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  pageConfig: IPage = new PageConfig();
  translation: any = null;
  selectorCompParams: any;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.config) {
        this.pageConfig = data.config;
      }
    });
  }

  onComponentSelect(e: any) {
    this.selectorCompParams = e;
  }
}
