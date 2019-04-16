import { Component, OnInit, Input } from '@angular/core';
import { IComponent } from 'app/model/component';
import { IRemoteAction } from 'app/model/event';

@Component({
  selector: 'fc-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  @Input() config: IComponent;
  @Input() remote: IRemoteAction;
  constructor() { }

  ngOnInit() {
  }

}
