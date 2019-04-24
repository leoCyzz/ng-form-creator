import { Component, OnInit } from '@angular/core';
import { IOperatorData, IDataTable, IDataGroup } from 'app/model/data';
import { IDynamicDataItem } from 'app/model/dynamic';

@Component({
  selector: 'fc-comp-data',
  templateUrl: './comp-data.component.html'
})
export class CompDataComponent implements IDynamicDataItem, OnInit {
  dataTables: IDataTable[];
  dataGroups: IDataGroup[];
  dataItem: IOperatorData;
  constructor() { }

  ngOnInit() {
  }


}
