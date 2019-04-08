import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, Input, Renderer2, OnChanges,
  SimpleChanges, ViewChildren, QueryList, ComponentFactoryResolver, ComponentRef, ViewContainerRef,
  Output, EventEmitter} from '@angular/core';
import { fromEvent } from 'rxjs';

const SELECTOR_LIST = [
  { type: 'button', text: 'button' },
  { type: 'checkbox', text: 'checkbox' },
  { type: 'container', text: 'container' },
  { type: 'datePicker', text: 'datepicker' },
  { type: 'input', text: 'input' },
  { type: 'inputNumber', text: 'inputNumber' },
  { type: 'printbox', text: 'printbox' },
  { type: 'radiobox', text: 'radiobox' },
  { type: 'scalebox', text: 'scalebox' },
  { type: 'selectbox', text: 'selectbox' },
  { type: 'table', text: 'table' },
  { type: 'upload', text: 'upload' }
];

@Component({
  selector: 'fb-sketch',
  templateUrl: './sketch.component.html'
})
export class SketchComponent implements OnInit {
  @Input() pageConfig: IPage;
  @ViewChild('sketchpad') sketchpad: ElementRef;
  @ViewChild('sketchBody') sketchBody: ElementRef;
  @ViewChild('sketchContainer') sketchContainer: ElementRef;
  @ViewChild('selectorContainer') selectorContainer: ElementRef;
  @ViewChildren('selectorElement') selectElements: QueryList<ElementRef>;
  @ViewChild('hoverTpl', { read: ViewContainerRef }) hoverTpl: ViewContainerRef;
  @ViewChild('mouseTpl', { read: ViewContainerRef }) mouseTpl: ViewContainerRef;
  @Output()selectorCompChange: EventEmitter<any> = new EventEmitter<any>();
  selectorList = SELECTOR_LIST;

  constructor() { }

  ngOnInit() {
  }

}
