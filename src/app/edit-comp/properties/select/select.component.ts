import { Component, OnInit } from '@angular/core';
import { ISelect } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-select',
  templateUrl: './select.component.html'
})
export class SelectPropertyComponent implements IDynamicProperty, OnInit {
  config: ISelect;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
