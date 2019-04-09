import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'src/app/model/dynamic';
import { ISelect } from 'src/app/model/component';

@Component({
  selector: 'fb-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements IDynamicComponent, OnInit {
  config: ISelect;

  constructor() { }

  ngOnInit() {
  }

}
