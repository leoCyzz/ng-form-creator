import { IDataItem } from './data';

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
    // 参与action的页面组件id集合
    comps: string[];
    // 过滤条件
    filters: IFilterItem[];
    // 额外function
    extraFuncs: IExtraFunction[];
    // 更多属性
    [key: string]: any;
}

export interface IFilterItem {
    // 过滤字段对应数据库字段
    data: IDataItem;
    // 过滤操作符
    operator: string;
    // 过滤值
    value: any;
}

export interface IExtraFunction {
    // func 类型
    type: string;
    // 更多属性
    [key: string]: any;
}
