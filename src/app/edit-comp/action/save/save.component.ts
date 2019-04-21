import { Component, OnInit, Input } from '@angular/core';
import { ISaveAction, TransferItem } from 'app/model/event';
import { OperatorData, IDataTable, IDataGroup } from 'app/model/data';

@Component({
  selector: 'fc-action-save',
  templateUrl: './save.component.html'
})
export class SaveActionComponent implements OnInit {
  @Input() action: ISaveAction;
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

  onDeleteDefaultDataItem(index: number) {
    this.action.defaultDataList.splice(index, 1);
  }

  onAddDefaultDataItem() {
    this.action.defaultDataList.push(new OperatorData());
  }
}
