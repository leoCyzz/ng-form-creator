import { Component, OnInit } from '@angular/core';
import { IDynamicProperty } from 'app/model/dynamic';
import { ICheckbox, CheckboxOption } from 'app/model/component';
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

  onAddCheckOption(i: number) {
    this.config.checkOptions.splice(i + 1, 0, new CheckboxOption());
  }

  onRemoveCheckOption(i: number) {
    this.config.checkOptions.splice(i, 1);
  }
}
