import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IInputNumber } from 'app/model/component';

@Component({
  selector: 'fc-input-number',
  templateUrl: './input-number.component.html'
})
export class InputNumberComponent implements IDynamicComponent, OnInit {
  config: IInputNumber;

  constructor() { }

  ngOnInit() {
  }

}
