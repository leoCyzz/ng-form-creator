import { Component, OnInit, Input } from '@angular/core';
import { IFormComponent } from 'app/model/component';

@Component({
  selector: 'fc-form-default',
  templateUrl: './form-default.component.html'
})
export class FormDefaultComponent implements OnInit {
  @Input() config: IFormComponent;
  @Input() transList: { key: string; value: string; }[];
  constructor() { }

  ngOnInit() {
  }

}
