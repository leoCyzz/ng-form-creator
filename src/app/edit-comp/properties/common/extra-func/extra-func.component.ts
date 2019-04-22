import { Component, OnInit, Input } from '@angular/core';
import { IFunctionItem } from 'app/model/event';
import { IDataGroup } from 'app/model/data';

@Component({
  selector: 'fc-extra-func',
  templateUrl: './extra-func.component.html'
})
export class ExtraFuncComponent implements OnInit {
  @Input() funcItem: IFunctionItem;
  @Input() dataGroups: IDataGroup[];
  constructor() { }

  ngOnInit() {
  }

}
