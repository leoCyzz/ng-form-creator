import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'app/model/dynamic';
import { IButton } from 'app/model/component';

@Component({
  selector: 'fc-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements IDynamicComponent, OnInit {
  config: IButton;

  constructor() { }

  ngOnInit() {
  }

}
