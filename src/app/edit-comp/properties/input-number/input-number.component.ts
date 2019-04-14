import { Component, OnInit } from '@angular/core';
import { IInputNumber } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-input-number',
  templateUrl: './input-number.component.html'
})
export class InputNumberPropertyComponent implements IDynamicProperty, OnInit {
  config: IInputNumber;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
