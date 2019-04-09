import { Component, OnInit } from '@angular/core';
import { ITable } from 'app/model/component';
import { IDynamicComponent } from 'app/model/dynamic';

@Component({
  selector: 'fb-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements IDynamicComponent, OnInit {
  config: ITable;

  constructor() { }

  ngOnInit() {
  }

}
