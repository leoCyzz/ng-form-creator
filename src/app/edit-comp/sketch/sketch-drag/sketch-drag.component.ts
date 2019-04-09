import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { IComponent } from 'app/model/component';
import { ItemDimension, RawPosition } from 'app/model/dynamic';

@Component({
  selector: 'fb-sketch-drag',
  templateUrl: './sketch-drag.component.html'
})
export class SketchDragComponent implements OnInit {
  @Input()type: string;
  @Input()config: IComponent;
  @Input()selectorType: string;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'fb__drag-box');
  }

  public setDimension(dimension: ItemDimension) {
    this.renderer.setStyle(this.el.nativeElement, 'width', dimension.width + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', dimension.height + 'px');
  }

  public setPosition(position: RawPosition) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + position.left + 'px, ' + position.top + 'px, 0px)');
  }

}
