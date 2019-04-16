import { IDataGroup, ICompData } from './data';
import { IEvent, IAction, IRemoteAction } from './event';
import { IComponent } from './component';

export interface IPage {
    // 页面Id
    id: string;
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
    remotes: {[key: string]: IRemoteAction};
    // 页面数据库模型
    dataGroups: IDataGroup[];
    // 页面所有组件数据模型
    dataItems: {[key: string]: ICompData};
    // 页面执行http请求的Action
    actions: IAction[];
}

export class PageConfig implements IPage {
    id: string;
    name: string;
    title: string;
    mode: string;
    updateTime: string;
    children: IComponent[];
    events: IEvent[];
    remotes: { [key: string]: IRemoteAction };
    dataGroups: IDataGroup[];
    dataItems: { [key: string]: ICompData };
    actions: IAction[];

    constructor(prop: {
        id?: string;
        name?: string;
        title?: string;
        mode?: string;
        updateTime?: string;
        children?: IComponent[];
        events?: IEvent[];
        remotes?: { [key: string]: IRemoteAction };
        dataGroups?: IDataGroup[];
        dataItems?: { [key: string]: ICompData };
        actions?: IAction[];
    } = {}) {
        this.id = prop.id || '';
        this.name = prop.name || '';
        this.title = prop.title || '';
        this.mode = prop.mode || 'page';
        this.updateTime = prop.updateTime || '';
        this.children = prop.children || [];
        this.events = prop.events || [];
        this.remotes = prop.remotes || {};
        this.dataGroups = prop.dataGroups || [];
        this.dataItems = prop.dataItems || {};
        this.actions = prop.actions || [];
    }
}
