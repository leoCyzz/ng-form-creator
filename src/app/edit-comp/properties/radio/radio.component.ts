import { Component, OnInit } from '@angular/core';
import { IRadio, RadioOption } from 'app/model/component';
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

  onAddRadioOption(index: number) {
    const addIndex = index ? index + 1 : this.config.radioOptions.length;
    this.config.radioOptions.splice(addIndex, 0, new RadioOption());
  }

  onRemoveRadioOption(i: number) {
    this.config.radioOptions.splice(i, 1);
  }
}
