import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { RawPosition, ItemDimension } from 'app/model/dynamic';

@Component({
  selector: 'fc-sketch-hover',
  templateUrl: './sketch-hover.component.html'
})
export class SketchHoverComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'fc__hover-box');
  }

  public setDimension(dimension: ItemDimension) {
    this.renderer.setStyle(this.el.nativeElement, 'width', dimension.width + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', dimension.height + 'px');
  }

  public setPosition(position: RawPosition) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + position.left + 'px, ' + position.top + 'px, 0px)');
  }

}
