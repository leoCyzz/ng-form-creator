export interface IDataGroup {
    name: string;
    tableId: string;
    addRecord: boolean;
    fkMap: IDataItem[];
    uniqueFields: string[];
}

export interface IFKItem {
    fieldId: string;
    groupName: string;
}

export interface IDataItem {
    groupName: string;
    fieldId: string;
}

export interface ICompData {
    data: IDataItem;
    operator: string;
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
    fkMap: IFKItem[];
    uniqueFields: string[];

    constructor(prop: {
        name?: string,
        tableId?: string,
        addRecord?: boolean,
        fkMap?: IFKItem[],
        uniqueFields?: string[]
    } = {}) {
        this.name = prop.name || '';
        this.tableId = prop.tableId || '';
        this.addRecord = prop.addRecord || false;
        this.fkMap = prop.fkMap || [];
        this.uniqueFields = prop.uniqueFields || [];
    }

}

export class FKItem implements IFKItem {
    fieldId: string;
    groupName: string;

    constructor(prop: {
        fieldId?: string,
        groupName?: string
    } = {}) {
        this.fieldId = prop.fieldId || '';
        this.groupName = prop.groupName || '';
    }
}

export class DataItem implements IDataItem {
    fieldId: string;
    groupName: string;

    constructor(prop: {
        fieldId?: string,
        groupName?: string
    } = {}) {
        this.fieldId = prop.fieldId || '';
        this.groupName = prop.groupName || '';
    }
}

export class CompData implements ICompData {
    data: IDataItem;
    operator: string;

    constructor(prop: {
        data?: IDataItem,
        operator?: string
    } = {}) {
        this.data = prop.data || new DataItem();
        this.operator = prop.operator || '';
    }
}