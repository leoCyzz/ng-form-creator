import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IInput } from 'app/model/component';

@Component({
  selector: 'fb-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements IDynamicComponent, OnInit {
  config: IInput;

  constructor() { }

  ngOnInit() {
  }

}
