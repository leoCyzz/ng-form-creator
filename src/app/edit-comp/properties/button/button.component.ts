import { Component, OnInit } from '@angular/core';
import { IDynamicProperty } from 'app/model/dynamic';
import { IButton } from 'app/model/component';
import { IDataTable } from 'app/model/data';

const BTN_TYPES = [
  { label: 'edit.property.btn.type.default', value: 'default', iconClass: 'default' },
  { label: 'edit.property.btn.type.primary', value: 'primary', iconClass: 'primary' },
  { label: 'edit.property.btn.type.success', value: 'success', iconClass: 'success' },
  { label: 'edit.property.btn.type.info', value: 'info', iconClass: 'info' },
  { label: 'edit.property.btn.type.warning', value: 'warning', iconClass: 'warning' },
  { label: 'edit.property.btn.type.danger', value: 'danger', iconClass: 'danger' },
  { label: 'edit.property.btn.type.link', value: 'link', iconClass: 'link' },
];

@Component({
  selector: 'fc-property-button',
  templateUrl: './button.component.html'
})
export class ButtonPropertyComponent implements IDynamicProperty, OnInit {
  config: IButton;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];
  btnTypes = BTN_TYPES;
  constructor() { }

  ngOnInit() {
  }

}
