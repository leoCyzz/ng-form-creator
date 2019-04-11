const uuid = require('uuid/v4');
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
    label: string;
    // 标签宽度
    labelWidth?: number;
    // 默认值
    defaultValue: any;
    // 组件事件
    events: IEvent[];
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
    id: string;
    type: string;
    name: string;
    visible: boolean;
    width?: number;

    constructor(prop: {
        id?: string,
        type?: string,
        name?: string,
        visible?: boolean
    } = {}) {
        this.id = prop.id || uuid().replace(/-/g, '');
        this.type = prop.type || '';
        this.name = prop.name || '';
        this.visible = prop.visible || true;
    }
}

export class ContainerComp extends ComponentBase implements ILayoutComponent {
    layout: string;
    children: IComponent[];

    constructor(prop: {
        layout?: string,
        children?: IComponent[]
    } = {}) {
        super();
        this.type = 'container';
        this.layout = prop.layout || 'horizontal';
        this.children = prop.children || [];
    }
}

export class FormComponentBase extends ComponentBase implements IFormComponent {
    disabled: boolean;
    required: boolean;
    label: string;
    labelWidth?: number;
    defaultValue: any;
    events: IEvent[];

    constructor(prop: {
        disabled?: boolean,
        required?: boolean,
        label?: string,
        defaultValue?: any,
        events?: IEvent[]
    } = {}) {
        super();
        this.disabled = prop.disabled || false;
        this.required = prop.required || false;
        this.label = prop.label || '';
        this.defaultValue = prop.defaultValue || null;
        this.events = prop.events || [];
    }
}

export class ButtonComp extends ComponentBase implements IButton {
    text: string;
    btnType: string;
    disabled: boolean;

    constructor(prop: {
        text?: string,
        btnType?: string,
        disabled?: boolean
    } = {}) {
        super();
        this.type = 'button';
        this.text = prop.text || '';
        this.btnType = prop.btnType || 'default';
        this.disabled = prop.disabled || false;
    }
}

export class CheckboxOption implements ICheckboxOption {
    text: string;
    value: any;
    checked?: boolean;

    constructor(prop: {
        text?: string,
        value?: any,
        checked?: boolean
    } = {}) {
        this.text = prop.text || '';
        this.value = prop.value || '';
        this.checked = prop.checked || false;
    }
}

export class CheckboxComp extends FormComponentBase implements ICheckbox {
    checkOptions: ICheckboxOption[];
    constructor(prop: {
        checkOptions?: ICheckboxOption[]
    } = {}) {
        super();
        this.type = 'checkbox';
        this.checkOptions = prop.checkOptions || [new CheckboxOption(), new CheckboxOption()];
    }
}

export class DatepickerComp extends FormComponentBase implements IDatePicker {
    mode: string;
    placeholder1: string;
    placeholder2?: string;
    showTime: boolean;
    format: string;
    initDate1: string;
    initDate2?: string;

    constructor(prop: {
        mode?: string,
        placeholder1?: string,
        placeholder2?: string,
        showTime?: boolean,
        format?: string,
        initDate1?: string,
        initDate2?: string
    } = {}) {
        super();
        this.type = 'datepicker';
        this.mode = prop.mode || 'single';
        this.placeholder1 = prop.placeholder1 || '';
        this.placeholder2 = prop.placeholder2 || '';
        this.showTime = prop.showTime || false;
        this.format = prop.format || '';
        this.initDate1 = prop.initDate1 || '';
        this.initDate2 = prop.initDate2 || '';
    }
}

export class InputComp extends FormComponentBase implements IInput {
    inputType: string;
    placeholder: string;
    readonly: boolean;
    areaRows: number;
    prefix: string;
    suffix: string;

    constructor(prop: {
        inputType?: string,
        placeholder?: string,
        readonly?: boolean,
        areaRows?: number,
        prefix?: string,
        suffix?: string
    } = {}) {
        super();
        this.type = 'input';
        this.inputType = prop.inputType || 'text';
        this.placeholder = prop.placeholder || '';
        this.readonly = prop.readonly || false;
        this.areaRows = prop.areaRows || 5;
        this.prefix = prop.prefix || '';
        this.suffix = prop.suffix || '';
    }
}

export class InputNumberComp extends FormComponentBase implements IInputNumber {
    placeholder: string;
    max: number;
    min: number;
    step: number;

    constructor(prop: {
        placeholder?: string,
        max?: number,
        min?: number,
        step?: number
    } = {}) {
        super();
        this.type = 'inputnumber';
        this.placeholder = prop.placeholder || '';
        this.max = prop.max || 999;
        this.min = prop.min || 0;
        this.step = prop.step || 1;
    }
}

export class PrintComp extends FormComponentBase implements IPrint {
    printTimes: number;
    tempName: string;
    height?: number;
    constructor(prop: {
        printTimes?: number,
        tempName?: string,
        height?: number
    } = {}) {
        super();
        this.type = 'print';
        this.printTimes = prop.printTimes || 1;
        this.tempName = prop.tempName || '';
        this.height = prop.height || 200;
    }
}

export class RadioOption implements IRadioOption {
    text: string;
    value: any;

    constructor(prop: {
        text?: string,
        value?: any,
    } = {}) {
        this.text = prop.text || '';
        this.value = prop.value || '';
    }
}

export class RadioComp extends FormComponentBase implements IRadio {
    radioOptions: IRadioOption[];
    constructor(prop: {
        radioOptions?: IRadioOption[]
    } = {}) {
        super();
        this.type = 'radio';
        this.radioOptions = prop.radioOptions || [new RadioOption(), new RadioOption()];
    }
}

export class ScaleComp extends FormComponentBase implements IScale {
    isAuto: boolean;
    placeholder: string;
    socketAddr: string;
    constructor(prop: {
        isAuto?: boolean,
        placeholder?: string,
        socketAddr?: string
    } = {}) {
        super();
        this.type = 'scale';
        this.isAuto = prop.isAuto || false;
        this.placeholder = prop.placeholder || '';
        this.socketAddr = prop.socketAddr || '';
    }
}

export class SelectOption implements ISelectOption {
    text: string;
    value: any;

    constructor(prop: {
        text?: string,
        value?: any,
    } = {}) {
        this.text = prop.text || '';
        this.value = prop.value || '';
    }
}

export class SelectComp extends FormComponentBase implements ISelect {
    placeholder: string;
    selectOptions: ISelectOption[];

    constructor(prop: {
        placeholder?: string,
        selectOptions?: ISelectOption[],
    } = {}) {
        super();
        this.type = 'select';
        this.placeholder = prop.placeholder || '';
        this.selectOptions = prop.selectOptions || [];
    }
}

export class TableComp extends FormComponentBase implements ITable {
    hasSerialNumber: boolean;
    hasCheckkbox: boolean;
    columns: ITableColumn[];
    pageSize: number;
    constructor(prop: {
        hasSerialNumber?: boolean,
        hasCheckkbox?: boolean,
        columns?: ITableColumn[],
        pageSize?: number
    } = {}) {
        super();
        this.type = 'table';
        this.hasSerialNumber = prop.hasSerialNumber || true;
        this.hasCheckkbox = prop.hasCheckkbox || false;
        this.columns = prop.columns || [];
        this.pageSize = prop.pageSize || 20;
    }
}
export class UploadComp extends FormComponentBase implements IUpload {
    text: string;
    accept: string[];
    fileType: string;
    multiple: boolean;
    limit: number;
    size: number;
    constructor(prop: {
        text?: string,
        accept?: string[],
        fileType?: string,
        multiple?: boolean,
        limit?: number,
        size?: number
    } = {}) {
        super();
        this.type = 'upload';
        this.text = prop.text || '';
        this.accept = prop.accept || [];
        this.fileType = prop.fileType || '';
        this.multiple = prop.multiple || false;
        this.limit = prop.limit || 1;
        this.size = prop.size || 10;
    }
}
