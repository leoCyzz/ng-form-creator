import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IComponent } from 'app/model/component';
import { IRemoteAction, IEvent, CompEvent, IAction, PageRemoteAction } from 'app/model/event';
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
  @Input() compNames: {id: string, name: string}[];
  @Input() actions: IAction[];
  events: IEvent[] = [];
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
      this.remote = this.remotes[this.config.id];
    }
  }

  onAddEvent() {
    if (!this.remote) {
      this.remotes[this.config.id] = {};
      this.remote = this.remotes[this.config.id];
    }
    const newEvent = new CompEvent();
    this.remote[newEvent.id] = new PageRemoteAction();
    this.events.push(newEvent);
  }

  onDeleteEvent(index: number) {
    const event = this.events[index];
    delete this.remote[event.id];
    this.events.splice(index, 1);
  }
}
