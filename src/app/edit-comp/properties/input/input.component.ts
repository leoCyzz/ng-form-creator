import { Component, OnInit } from '@angular/core';
import { IInput } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-input',
  templateUrl: './input.component.html'
})
export class InputPropertyComponent implements IDynamicProperty, OnInit {
  config: IInput;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
