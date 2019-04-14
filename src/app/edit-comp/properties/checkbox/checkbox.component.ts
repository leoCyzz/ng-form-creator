import { Component, OnInit } from '@angular/core';
import { IDynamicProperty } from 'app/model/dynamic';
import { ICheckbox } from 'app/model/component';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxPropertyComponent implements IDynamicProperty, OnInit {
  config: ICheckbox;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
