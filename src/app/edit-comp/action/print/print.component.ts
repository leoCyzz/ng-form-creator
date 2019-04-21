import { Component, OnInit, Input } from '@angular/core';
import { IPrintAction, PrintItem } from 'app/model/event';
import { IDataTable, IDataGroup } from 'app/model/data';

@Component({
  selector: 'fc-action-print',
  templateUrl: './print.component.html'
})
export class PrintActionComponent implements OnInit {
  @Input() action: IPrintAction;
  @Input() dataTables: IDataTable[];
  @Input() dataGroups: IDataGroup[];

  constructor() { }

  ngOnInit() {
  }

  onAddPrintItem() {
    this.action.printItems.push(new PrintItem());
  }
  onDeletePrintItem(index: number) {
    this.action.printItems.splice(index, 1);
  }
}
