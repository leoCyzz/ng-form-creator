import { Component, OnInit, Input } from '@angular/core';
import { CompAction, ExportAction, ImportAction, PrintAction, QueryAction, SaveAction,
  ViewAction, ExtraFunction, IAction } from 'app/model/event';
import { IDataTable, OPERATOR_TYPES, OperatorData } from 'app/model/data';
import { IPage } from 'app/model/page';

const ACTION_TYPES = [
  { showText: 'Delete', value: 'delete' },
  { showText: 'Export', value: 'export' },
  { showText: 'Import', value: 'import' },
  { showText: 'Print', value: 'print' },
  { showText: 'Query', value: 'query' },
  { showText: 'Save', value: 'save' },
  { showText: 'View', value: 'view' }
];

@Component({
  selector: 'fc-action',
  templateUrl: './action.component.html'
})
export class ActionComponent implements OnInit {
  @Input() config: IPage;
  @Input() dataTables: IDataTable[];
  @Input() compNames: {id: string, name: string}[];
  actionTypes = ACTION_TYPES;
  operatorTypes = OPERATOR_TYPES;
  currentActiveIndex = 0;
  constructor() { }

  ngOnInit() {
  }

  onAddAction() {
    const newAction = new CompAction();
    this.config.actionItems[newAction.id] = [];
    this.config.actions.push(newAction);
    this.currentActiveIndex = this.config.actions.length - 1;
  }
  onDeleteAction(index: number) {
    const id = this.config.actions[index].id;
    delete this.config.actionItems[id];
    this.config.actions.splice(index, 1);
  }
  onAddFilter(index: number) {
    this.config.actions[index].filters.push(new OperatorData());
  }
  onDeleteFilter(index: number, fIndex: number) {
    this.config.actions[index].filters.splice(fIndex, 1);
  }
  onAddExtraFunction(index: number) {
    this.config.actions[index].extraFuncs.push(new ExtraFunction());
  }

  onActionTypeChange(e: any, index: number) {
    this.config.actions[index].type = e;
    this.currentActiveIndex = index;
    let action = null;
    switch (e) {
      case 'export':
        action = new ExportAction();
        break;
      case 'import':
        action = new ImportAction();
        break;
      case 'print':
        action = new PrintAction();
        break;
      case 'query':
        action = new QueryAction();
        break;
      case 'save':
        action = new SaveAction();
        break;
      case 'view':
        action = new ViewAction();
        break;
      case 'delete':
      default:
        action = new CompAction();
        break;
    }
    const resAction = this.updateAction(action, index);
    this.config.actions[index] = resAction;
  }

  updateAction(action: IAction, index: number) {
    const originAction = new CompAction();
    const targetAction = this.config.actions[index];
    originAction.id = targetAction.id;
    originAction.name = targetAction.name;
    originAction.type = targetAction.type;
    originAction.filters = targetAction.filters;
    originAction.extraFuncs = targetAction.extraFuncs;

    Object.assign(action, originAction);

    return action;
  }
}
