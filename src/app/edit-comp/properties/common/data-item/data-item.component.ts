import { Component, OnInit, Input } from '@angular/core';
import { IDataTable, IDataGroup, IDataItem } from 'app/model/data';


@Component({
  selector: 'fc-data-item',
  templateUrl: './data-item.component.html'
})
export class DataItemComponent implements OnInit {
  @Input() dataItem: IDataItem;
  @Input() dataTables: IDataTable[];
  @Input() dataGroups: IDataGroup[];

  constructor() { }

  ngOnInit() {}

}
