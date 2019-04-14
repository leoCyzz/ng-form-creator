import { Component, OnInit } from '@angular/core';
import { IPage } from 'app/model/page';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-page',
  templateUrl: './page.component.html'
})
export class PagePropertyComponent implements IDynamicProperty, OnInit {
  config: IPage;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }
}
