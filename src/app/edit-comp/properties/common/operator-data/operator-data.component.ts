import { Component, OnInit, Input } from '@angular/core';
import { IOperatorData, IDataTable, IDataGroup, OPERATOR_TYPES } from 'app/model/data';

@Component({
  selector: 'fc-operator-data',
  templateUrl: './operator-data.component.html'
})
export class OperatorDataComponent implements OnInit {

  @Input() dataItem: IOperatorData;
  @Input() dataTables: IDataTable[];
  @Input() dataGroups: IDataGroup[];
  @Input() hasOperator = false;
  @Input() hasValue = false;

  operatorTypes = OPERATOR_TYPES;
  constructor() { }

  ngOnInit() {
  }
}
