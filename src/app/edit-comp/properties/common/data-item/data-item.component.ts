import { Component, OnInit, Input } from '@angular/core';
import { IDataTable, IDataGroup, ICompData } from 'app/model/data';
import { IPage } from 'app/model/page';

@Component({
  selector: 'fc-data-item',
  templateUrl: './data-item.component.html'
})
export class DataItemComponent implements OnInit {
  @Input() config: IPage;
  @Input() compId: string;
  @Input() dataTables: IDataTable[];

  dataItem: ICompData = null;
  constructor() { }

  ngOnInit() {
    this.dataItem = this.config.dataItems[this.compId];
  }

}
