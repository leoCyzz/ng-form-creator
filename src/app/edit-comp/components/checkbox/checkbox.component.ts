import { Component, OnInit } from '@angular/core';
import { ICheckbox } from 'app/model/component';
import { IDynamicComponent } from 'app/model/dynamic';

@Component({
  selector: 'fb-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements IDynamicComponent, OnInit {
  config: ICheckbox;

  constructor() { }

  ngOnInit() {
  }

}
