import { Component, OnInit, Input } from '@angular/core';
import { IExportAction } from 'app/model/event';

@Component({
  selector: 'fc-action-export',
  templateUrl: './export.component.html'
})
export class ExportActionComponent implements OnInit {
  @Input() action: IExportAction;
  constructor() { }

  ngOnInit() {
  }

}
