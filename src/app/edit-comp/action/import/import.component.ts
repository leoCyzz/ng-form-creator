import { Component, OnInit, Input } from '@angular/core';
import { IImportAction } from 'app/model/event';

@Component({
  selector: 'fc-action-import',
  templateUrl: './import.component.html'
})
export class ImportActionComponent implements OnInit {
  @Input() action: IImportAction;
  constructor() { }

  ngOnInit() {
  }

}
