import { Component, OnInit, Input } from '@angular/core';

export type ExceptionType = 403 | 404 | 500;

@Component({
  selector: 'cc-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.less']
})
export class ExceptionComponent implements OnInit {
  excType: ExceptionType;
  excImg = '';
  excTitle = '';
  excDesc = '';

  @Input()
  set type(value: ExceptionType) {
    const item = {
      403: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
        title: '403',
      },
      404: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        title: '404',
      },
      500: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
        title: '500',
      },
    }[value];

    this.excType = value;
    this.excImg = item.img;
    this.excTitle = item.title;
  }
  @Input()
    set img(value: string) {
      this.excImg = value;
  }

  @Input()
  set title(value: string) {
    this.excTitle = value;
  }
  @Input()
  set desc(value: string) {
    this.excDesc = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
