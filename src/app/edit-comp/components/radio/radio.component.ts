import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IRadio } from 'app/model/component';

@Component({
  selector: 'fb-radio',
  templateUrl: './radio.component.html'
})
export class RadioComponent implements IDynamicComponent, OnInit {
  config: IRadio;

  constructor() { }

  ngOnInit() {
  }

}
