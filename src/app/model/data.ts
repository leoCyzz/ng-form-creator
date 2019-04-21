export interface IDataGroup {
    name: string;
    tableId: string;
    addRecord: boolean;
    fkMap: IDataItem[];
    uniqueFields: string[];
}

export interface IDataItem {
    groupName: string;
    fieldId: string;
}

export interface IOperatorData extends IDataItem {
    operator?: number;
    value?: string;
}

export interface IDataTable {
    id: string;
    name: string;
    fields: {
        id: string;
        name: string;
    }[];
}

export class DataGroup implements IDataGroup {
    name: string;
    tableId: string;
    addRecord: boolean;
    fkMap: IDataItem[];
    uniqueFields: string[];

    constructor(prop: {
        name?: string,
        tableId?: string,
        addRecord?: boolean,
        fkMap?: IDataItem[],
        uniqueFields?: string[]
    } = {}) {
        this.name = prop.name || '';
        this.tableId = prop.tableId || '';
        this.addRecord = prop.addRecord || false;
        this.fkMap = prop.fkMap || [];
        this.uniqueFields = prop.uniqueFields || [];
    }

}

export class DataItem implements IDataItem {
    fieldId: string;
    groupName: string;

    constructor(prop: {
        fieldId?: string,
        groupName?: string,

    } = {}) {
        this.fieldId = prop.fieldId || '';
        this.groupName = prop.groupName || '';
    }
}

export class OperatorData extends DataItem implements IOperatorData {
    operator?: number;
    value?: string;

    constructor(prop: {
        operator?: number,
        value?: string
    } = {}) {
        super();
        this.operator = prop.operator || 0;
        this.value = prop.value || '';
    }
}

export const OPERATOR_TYPES = [
    { text: 'Equals', value: 0 },
    { text: 'GreaterThan', value: 1 },
    { text: 'LessThan', value: 2 },
    { text: 'GreaterEqual', value: 3 },
    { text: 'LessEqual', value: 4 },
    { text: 'NotEqual', value: 5 },
    { text: 'Include', value: 11 },
    { text: 'BelongTo', value: 12 },
    { text: 'Similar', value: 21 },
    { text: 'Exist', value: 22 },
    { text: 'Equivalent', value: 23 }
];
