import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IOperatorData, IDataTable, IDataGroup, OPERATOR_TYPES } from 'app/model/data';

@Component({
  selector: 'fc-operator-data',
  templateUrl: './operator-data.component.html'
})
export class OperatorDataComponent implements OnInit, OnChanges {

  @Input() dataItem: IOperatorData;
  @Input() dataTables: IDataTable[];
  @Input() dataGroups: IDataGroup[];
  @Input() hasOperator = false;
  @Input() hasValue = false;

  operatorTypes = OPERATOR_TYPES;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
