import { Component, OnInit } from '@angular/core';
import { IRadio } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-radio',
  templateUrl: './radio.component.html'
})
export class RadioPropertyComponent implements IDynamicProperty, OnInit {
  config: IRadio;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
