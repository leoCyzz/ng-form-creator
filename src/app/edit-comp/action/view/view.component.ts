import { Component, OnInit, Input } from '@angular/core';
import { IViewAction } from 'app/model/event';

@Component({
  selector: 'fc-action-view',
  templateUrl: './view.component.html'
})
export class ViewActionComponent implements OnInit {
  @Input() action: IViewAction;
  constructor() { }

  ngOnInit() {
  }

}
