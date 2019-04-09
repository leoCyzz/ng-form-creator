import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IScale } from 'app/model/component';

@Component({
  selector: 'fc-scale',
  templateUrl: './scale.component.html'
})
export class ScaleComponent implements IDynamicComponent, OnInit {
  config: IScale;

  constructor() { }

  ngOnInit() {
  }

}
