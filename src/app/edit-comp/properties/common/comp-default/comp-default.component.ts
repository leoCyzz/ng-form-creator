import { Component, OnInit, Input } from '@angular/core';
import { IComponent } from 'app/model/component';

@Component({
  selector: 'fc-comp-default',
  templateUrl: './comp-default.component.html'
})
export class CompDefaultComponent implements OnInit {
  @Input() config: IComponent;
  constructor() { }

  ngOnInit() {
  }

}
