import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'src/app/model/dynamic';
import { IPrint } from 'src/app/model/component';

@Component({
  selector: 'fb-print',
  templateUrl: './print.component.html'
})
export class PrintComponent implements IDynamicComponent, OnInit {
  config: IPrint;

  constructor() { }

  ngOnInit() {
  }

}
