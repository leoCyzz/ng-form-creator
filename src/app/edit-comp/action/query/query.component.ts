import { Component, OnInit, Input } from '@angular/core';
import { IQueryAction, TransferItem } from 'app/model/event';
import { IDataTable, IDataGroup } from 'app/model/data';

@Component({
  selector: 'fc-action-query',
  templateUrl: './query.component.html'
})
export class QueryActionComponent implements OnInit {
  @Input() action: IQueryAction;
  @Input() compNames: {id: string, name: string}[];
  @Input() dataTables: IDataTable[];
  @Input() dataGroups: IDataGroup[];
  constructor() { }

  ngOnInit() {
  }

  onAddTransferItem() {
    this.action.transfers.push(new TransferItem());
  }

  onDeleteTransferItem(index: number) {
    this.action.transfers.splice(index, 1);
  }
}
