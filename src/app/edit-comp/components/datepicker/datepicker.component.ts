import { Component, OnInit } from '@angular/core';
import { IDatePicker } from 'app/model/component';
import { IDynamicComponent } from 'app/model/dynamic';

@Component({
  selector: 'fc-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent implements IDynamicComponent, OnInit {
  config: IDatePicker;
  constructor() { }

  ngOnInit() {
  }

}
