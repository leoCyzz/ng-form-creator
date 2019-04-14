import { Component, OnInit } from '@angular/core';
import { ILayoutComponent } from 'app/model/component';
import { IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Component({
  selector: 'fc-property-container',
  templateUrl: './container.component.html'
})
export class ContainerPropertyComponent implements IDynamicProperty, OnInit {
  config: ILayoutComponent;
  transList: { key: string; value: string; }[];
  dataTables: IDataTable[];
  localActions: string[];

  constructor() { }

  ngOnInit() {
  }

}
