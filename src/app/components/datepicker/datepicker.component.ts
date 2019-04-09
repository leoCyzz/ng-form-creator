import { Component, OnInit } from '@angular/core';
import { IDatePicker } from 'src/app/model/component';
import { IDynamicComponent } from 'src/app/model/dynamic';

@Component({
  selector: 'fb-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent implements IDynamicComponent, OnInit {
  config: IDatePicker;

  constructor() { }

  ngOnInit() {
  }

}
