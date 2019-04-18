import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IComponent } from 'app/model/component';
import { IRemoteAction, IEvent, CompEvent } from 'app/model/event';
import { IPage } from 'app/model/page';

const COMP_EVENT = {
  page: ['init'],
  button: ['click'],
  checkbox: ['change'],
  datepicker: ['change'],
  input: ['change'],
  inputnumber: ['change'],
  print: [],
  radio: ['change'],
  scale: ['change'],
  select: ['change'],
  upload: ['click']
};

@Component({
  selector: 'fc-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit, OnChanges {
  @Input() config: IComponent | IPage;
  @Input() remotes: {};
  @Input() localActions: string[];
  events: IEvent[];
  remote: { [key: string]: IRemoteAction };
  eventTypes = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 根据config变换获取该config的events和适用于该comp的EventType
    if (changes.hasOwnProperty('config')) {
      const type = this.config.hasOwnProperty('type') ? (this.config as IComponent).type : 'page';
      this.eventTypes = COMP_EVENT[type];
      this.events = this.config.events;
    }
  }

  onAddEvent() {
    this.events.push(new CompEvent());
  }
}
