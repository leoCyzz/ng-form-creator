import { Component, OnInit } from '@angular/core';
import { IScale } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-scale',
  templateUrl: './scale.component.html'
})
export class ScalePropertyComponent implements IDynamicProperty, OnInit {
  config: IScale;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
