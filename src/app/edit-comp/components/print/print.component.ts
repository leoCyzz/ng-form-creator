import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IPrint } from 'app/model/component';

@Component({
  selector: 'fc-print',
  templateUrl: './print.component.html'
})
export class PrintComponent implements IDynamicComponent, OnInit {
  config: IPrint;

  constructor() { }

  ngOnInit() {
  }

}
