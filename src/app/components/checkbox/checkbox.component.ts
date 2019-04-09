import { Component, OnInit } from '@angular/core';
import { ICheckbox } from 'src/app/model/component';
import { IDynamicComponent } from 'src/app/model/dynamic';

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
