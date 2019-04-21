const uuid = require('uuid/v4');
import { IDataGroup, IOperatorData } from './data';
import { IEvent, IAction, IRemoteAction, PageRemoteAction } from './event';
import { IComponent } from './component';

export interface IPage {
    // 页面Id(数据库使用)
    id: string;
    // 页面Id(前端使用)
    pageId: string;
    name: string;
    // 页面标题-i18n
    title: string;
    // 页面模式：page, modal
    mode: string;
    // 页面更新时间
    updateTime: string;
    // 页面子组件
    children: IComponent[];
    // 页面事件
    events: IEvent[];
    // 页面HttpAction集合
    remotes: {[key: string]: { [key: string]: IRemoteAction }};
    // 页面数据库模型
    dataGroups: IDataGroup[];
    // 页面所有组件数据模型
    dataItems: {[key: string]: IOperatorData};
    // 页面执行http请求的Action
    actions: IAction[];

    actionItems: { [key: string]: string[] };
}

export class PageConfig implements IPage {
    id: string;
    pageId: string;
    name: string;
    title: string;
    mode: string;
    updateTime: string;
    children: IComponent[];
    events: IEvent[];
    remotes: { [key: string]: { [key: string]: IRemoteAction } };
    dataGroups: IDataGroup[];
    dataItems: { [key: string]: IOperatorData };
    actions: IAction[];
    actionItems: { [key: string]: string[] };

    constructor(prop: {
        id?: string;
        pageId?: string;
        name?: string;
        title?: string;
        mode?: string;
        updateTime?: string;
        children?: IComponent[];
        events?: IEvent[];
        remotes?: { [key: string]: { [key: string]: IRemoteAction } };
        dataGroups?: IDataGroup[];
        dataItems?: { [key: string]: IOperatorData };
        actions?: IAction[];
        actionItems?: { [key: string]: string[] };
    } = {}) {
        this.id = prop.id || '';
        this.pageId = prop.pageId || uuid().replace(/-/g, '');
        this.name = prop.name || '';
        this.title = prop.title || '';
        this.mode = prop.mode || 'page';
        this.updateTime = prop.updateTime || '';
        this.children = prop.children || [];
        this.events = prop.events || [];
        this.remotes = prop.remotes || { [this.pageId]: {} };
        this.dataGroups = prop.dataGroups || [];
        this.dataItems = prop.dataItems || {};
        this.actions = prop.actions || [];
        this.actionItems = prop.actionItems || {};
    }
}
