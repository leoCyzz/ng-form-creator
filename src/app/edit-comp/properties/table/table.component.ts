import { Component, OnInit } from '@angular/core';
import { ITable } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-table',
  templateUrl: './table.component.html'
})
export class TablePropertyComponent implements IDynamicProperty, OnInit {
  config: ITable;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
