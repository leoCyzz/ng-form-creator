import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'src/app/model/dynamic';
import { IInputNumber } from 'src/app/model/component';

@Component({
  selector: 'fb-input-number',
  templateUrl: './input-number.component.html'
})
export class InputNumberComponent implements IDynamicComponent, OnInit {
  config: IInputNumber;

  constructor() { }

  ngOnInit() {
  }

}
