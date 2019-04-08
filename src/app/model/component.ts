import { IEvent } from './event';

export interface IComponent {
    // 组件唯一标识符
    id: string;
    // 组件类型
    type: string;
    // 组件名称, 可为空，但非空唯一
    name: string;
    // 是否可见
    visible: boolean;
    // 组件宽度
    width?: number;
    // 更多属性
    [key: string]: any;
}

export interface ILayoutComponent extends IComponent {
    // 组件排列方向
    layout: string;
    // 子组件
    children: IComponent[];
}

export interface IFormComponent extends IComponent {
    // 组件可用
    disabled: boolean;
    // 组件必填
    required: boolean;
    // 组件标签
    label?: string;
    // 标签宽度
    labelWidth?: number;
    // 默认值
    defaultValue?: any;
    // 组件事件
    events?: IEvent[];
}

export interface IButton extends IComponent {
    // 按钮文字
    text: string;
    // 按钮类型
    btnType: string;
    // 按钮可用
    disabled: boolean;
}

export interface ICheckbox extends IFormComponent {
    // 多选框值
    checkOptions: ICheckboxOption[];
}

export interface ICheckboxOption {
    // 显示文本
    text: string;
    // 值
    value: any;
    // 是否默认选中
    checked?: boolean;
}

export interface IDatePicker extends IFormComponent {
    // 模式：single, multiple
    mode: string;
    // 占位提示符
    placeholder1: string;
    placeholder2?: string;
    // 是否显示时间
    showTime: boolean;
    // 日期格式化
    format: string;
    // 初始时间
    initDate1: string;
    initDate2?: string;
}

export interface IInput extends IFormComponent {
    // 输入框类型 text,textarea, password
    inputType: string;
    // 占位提示符
    placeholder: string;
    // text 是否只读
    readonly: boolean;
    // textarea 行数
    areaRows: number;
    // text 前缀
    prefix: string;
    // text 后缀
    suffix: string;
}

export interface IInputNumber extends IFormComponent {
    placeholder: string;
    max: number;
    min: number;
    step: number;
}

export interface IRadio extends IFormComponent {
    radioOptions: IRadioOption[];
}

export interface IRadioOption {
    text: string;
    value: any;
}

export interface ISelect extends IFormComponent {
    placeholder: string;
    selectOptions: ISelectOption[];
}

export interface ISelectOption {
    text: string;
    value: any;
}

export interface IScale extends IFormComponent {
    isAuto: boolean;
    placeholder: string;
    socketAddr: string;
}

export interface ITable extends IComponent {
    hasSerialNumber: boolean;
    hasCheckkbox: boolean;
    columns: ITableColumn[];
    pageSize: number;
}

export interface ITableColumn {
    title: string;
    name: string;
    fixed?: string;
    width?: number;
    buttons: ITableColumnButton[];
}

export interface ITableColumnButton {
    text: string;
    type: string;
    clickAction: string;
}

export interface IPrint extends IComponent {
    disabled: boolean;
    printTimes: number;
    tempName: string;
    height?: number;
}

export interface IUpload extends IFormComponent {
    // 上传按钮文本
    text: string;
    accept: string[];
    fileType: string;
    multiple: boolean;
    // 单次上传文件数量限制
    limit: number;
    // 单次上传文件大小限制
    size: number;
}

export class ComponentBase implements IComponent {
    
}

