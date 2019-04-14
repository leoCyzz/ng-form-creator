import { Component, OnInit, Input } from '@angular/core';
import { IComponent } from 'app/model/component';
import { IDataTable, IDataGroup } from 'app/model/data';

@Component({
  selector: 'fc-data-item',
  templateUrl: './data-item.component.html'
})
export class DataItemComponent implements OnInit {
  @Input() config: IComponent;
  @Input() dataTables: IDataTable[];
  @Input() dataGroups: IDataGroup[];

  constructor() { }

  ngOnInit() {
  }

}
