import { Component, OnInit, Output, Input, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ItemDimension, RawPosition } from 'app/model/dynamic';

@Component({
  selector: 'fc-sketch-select',
  templateUrl: './sketch-select.component.html'
})
export class SketchSelectComponent implements OnInit {

  @Input() compParams: any;
  @Output() compClose = new EventEmitter();
  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'fc__sketch-select-box');
  }

  public setDimension(dimension: ItemDimension) {
    this.renderer.setStyle(this.el.nativeElement, 'width', dimension.width + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', dimension.height + 'px');
  }

  public setPosition(position: RawPosition) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + position.left + 'px, ' + position.top + 'px, 0px)');
  }

}
