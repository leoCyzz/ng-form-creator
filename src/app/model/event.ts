const uuid = require('uuid/v4');
import { IDataItem, DataItem, IOperatorData } from './data';

export interface IEvent {
    id: string;
    type: string;
    local: ILocalAction;
    afterRemote: ILocalAction;
}

export interface ILocalAction {
    // local action 名称
    name: string;
    // 组件id数组
    comps: string[];
}

export interface IRemoteAction {
    queue: string[];
}

export interface IAction {
    // action 唯一标识符
    id: string;
    // 供event选择显示文本
    name: string;
    // action类型：query, save, delete, export, import, print, view
    type: string;
    // 过滤条件
    filters: IOperatorData[];
    // 额外function
    extraFuncs: IExtraFunction;
    // 更多属性
    [key: string]: any;
}

export interface IFilterItem {
    // 过滤字段对应数据库字段
    data: IDataItem;
    // 过滤操作符
    operator: number;
    // 过滤值
    value: string;
}

export interface IExtraFunction {
    prepare: IFunctionItem[];
    after: IFunctionItem[];
    validate: IFunctionItem[];
}

export interface IFunctionItem {
    groupName: string;
    functionName: string;
}

export interface ISaveAction extends IAction {
    transfers: ITransferItem[];
    defaultDataList: IOperatorData[];
}

export interface IQueryAction extends IAction {
    resultNames: string[];
    transfers: ITransferItem[];
}

export interface IExportAction extends IAction {
    templateId: string;
}

export interface IImportAction extends IAction {
    templateId: string;
    importName: string;
}

export interface IDeleteAction extends IAction {
}

export interface IPrintAction extends IAction {
    printItems: IPrintItem[];
    resultItem: string[];
}

export interface IViewAction extends IAction {
    fileName: string;
}

export interface IPrintItem extends IDataItem {
    keyName: string;
    itemName: string;
}

export interface ITransferItem {
    origin: IDataItem;
    refers: IDataItem;
}

export class LocalAction implements ILocalAction {
    name: string;
    comps: string[];

    constructor(prop: {
        name?: string,
        comps?: string[]
    } = {}) {
       this.name = prop.name || '';
       this.comps = prop.comps || [];
    }
}

export class CompEvent implements IEvent {
    id: string;
    type: string;
    local: ILocalAction;
    afterRemote: ILocalAction;

    constructor(prop: {
        id?: string,
        type?: string,
        local?: ILocalAction,
        afterRemote?: ILocalAction
    } = {}) {
        this.id = prop.id || uuid().replace(/-/g, '');
        this.type = prop.type || '';
        this.local = prop.local || new LocalAction();
        this.afterRemote = prop.afterRemote || new LocalAction();
    }
}

export class PageRemoteAction implements IRemoteAction {
    queue: string[];

    constructor(prop: {
        queue?: string[]
    } = {}) {
        this.queue = prop.queue || [];
    }
}

export class FilterItem implements IFilterItem {
    data: IDataItem;
    operator: number;
    value: string;

    constructor(prop: {
        data?: IDataItem,
        operator?: number,
        value?: string
    } = {}) {
        this.data = prop.data || new DataItem();
        this.operator = prop.operator || 0;
        this.value = prop.value || '';
    }
}

export class FunctionItem implements IFunctionItem {
    groupName: string;
    functionName: string;

    constructor(prop: {
        groupName?: string,
        functionName?: string
    } = {}) {
        this.groupName = prop.groupName || '';
        this.functionName = prop.functionName || '';
    }
}

export class ExtraFunction implements IExtraFunction {
    prepare: IFunctionItem[];
    after: IFunctionItem[];
    validate: IFunctionItem[];

    constructor(prop: {
        prepare?: IFunctionItem[],
        after?: IFunctionItem[],
        validate?: IFunctionItem[]
    } = {}) {
        this.prepare = prop.prepare || [];
        this.after = prop.after || [];
        this.validate = prop.validate || [];
    }
}

export class CompAction implements IAction {
    id: string;
    name: string;
    type: string;
    filters: IOperatorData[];
    extraFuncs: IExtraFunction;

    constructor(prop: {
        id?: string,
        name?: string,
        type?: string,
        filters?: IOperatorData[],
        extraFuncs?: IExtraFunction
    } = {}) {
        this.id = prop.id || uuid().replace(/-/g, '');
        this.name = prop.name || '';
        this.type = prop.type || '';
        this.filters = prop.filters || [];
        this.extraFuncs = prop.extraFuncs || new ExtraFunction();
    }
}

export class SaveAction extends CompAction implements ISaveAction {
    transfers: ITransferItem[];
    defaultDataList: IOperatorData[];

    constructor(prop: {
        transfers?: ITransferItem[],
        defaultDataList?: IOperatorData[]
    } = {}) {
        super();
        this.type = 'save';
        this.transfers = prop.transfers || [];
        this.defaultDataList = prop.defaultDataList || [];
    }
}

export class QueryAction extends CompAction implements IQueryAction {
    resultNames: string[];
    transfers: ITransferItem[];

    constructor(prop: {
        resultNames?: string[],
        transfers?: ITransferItem[]
    } = {}) {
        super();
        this.type = 'query';
        this.resultNames = prop.resultNames || [];
        this.transfers = prop.transfers || [];
    }
}

export class ExportAction extends CompAction implements IExportAction {
    templateId: string;

    constructor(prop: {
        templateId?: string
    } = {}) {
        super();
        this.type = 'export';
        this.templateId = prop.templateId || '';
    }
}

export class ImportAction extends CompAction implements IImportAction {
    templateId: string;
    importName: string;

    constructor(prop: {
        templateId?: string,
        importName?: string
    } = {}) {
        super();
        this.type = 'import';
        this.templateId = prop.templateId || '';
        this.importName = prop.importName || '';
    }
}

export class DeleteAction extends CompAction implements IDeleteAction {

    constructor(prop: {} = {}) {
        super();
        this.type = 'delete';
    }
}

export class PrintAction extends CompAction implements IPrintAction {
    printItems: IPrintItem[];
    resultItem: string[];

    constructor(prop: {
        printItems?: IPrintItem[],
        resultItem?: string[]
    } = {}) {
        super();
        this.type = 'print';
        this.printItems = prop.printItems || [];
        this.resultItem = prop.resultItem || [];
    }
}

export class ViewAction extends CompAction implements IViewAction {
    fileName: string;

    constructor(prop: {
        fileName?: string
    } = {}) {
        super();
        this.type = 'view';
        this.fileName = prop.fileName || '';
    }
}

export class PrintItem extends DataItem implements IPrintItem {
    keyName: string;
    itemName: string;

    constructor(prop: {
        keyName?: string,
        itemName?: string
    } = {}) {
        super();
        this.keyName = prop.keyName || '';
        this.itemName = prop.itemName || '';
    }
}

export class TransferItem implements ITransferItem {
    origin: IDataItem;
    refers: IDataItem;

    constructor(prop: {
        origin?: IDataItem,
        refers?: IDataItem
    } = {}) {
        this.origin = prop.origin || new DataItem();
        this.refers = prop.refers || new DataItem();
    }
}
