import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'src/app/model/dynamic';
import { IScale } from 'src/app/model/component';

@Component({
  selector: 'fb-scale',
  templateUrl: './scale.component.html'
})
export class ScaleComponent implements IDynamicComponent, OnInit {
  config: IScale;

  constructor() { }

  ngOnInit() {
  }

}
