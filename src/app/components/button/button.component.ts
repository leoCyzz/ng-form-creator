import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'src/app/model/dynamic';
import { IButton } from 'src/app/model/component';

@Component({
  selector: 'fb-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements IDynamicComponent, OnInit {
  config: IButton;

  constructor() { }

  ngOnInit() {
  }

}
