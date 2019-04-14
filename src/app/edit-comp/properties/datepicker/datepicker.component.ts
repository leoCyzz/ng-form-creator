import { Component, OnInit } from '@angular/core';
import { IDatePicker } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerPropertyComponent implements IDynamicProperty, OnInit {
  config: IDatePicker;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
