import { Component, OnInit } from '@angular/core';
import { IDynamicComponent } from 'src/app/model/dynamic';
import { ILayoutComponent } from 'src/app/model/component';

@Component({
  selector: 'fb-container',
  templateUrl: './container.component.html'
})
export class ContainerComponent implements IDynamicComponent, OnInit {
  config: ILayoutComponent;
  constructor() { }

  ngOnInit() {
  }

}
