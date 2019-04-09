import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { ISelect } from 'app/model/component';

@Component({
  selector: 'fc-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements IDynamicComponent, OnInit {
  config: ISelect;

  constructor() { }

  ngOnInit() {
  }

}
