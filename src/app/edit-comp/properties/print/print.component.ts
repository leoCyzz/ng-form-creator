import { Component, OnInit } from '@angular/core';
import { IPrint } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-print',
  templateUrl: './print.component.html'
})
export class PrintPropertyComponent implements IDynamicProperty, OnInit {
  config: IPrint;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
