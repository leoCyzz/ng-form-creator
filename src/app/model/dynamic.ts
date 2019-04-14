import { Type } from '@angular/core';
import { IPage } from './page';
import { IComponent } from './component';
import { ButtonComponent, ContainerComponent, CheckboxComponent, DatepickerComponent,
    InputComponent, InputNumberComponent, PrintComponent, ScaleComponent, SelectComponent,
    TableComponent, UploadComponent, RadioComponent } from '../edit-comp/components';
import { ButtonPropertyComponent, ContainerPropertyComponent, InputPropertyComponent,
    CheckboxPropertyComponent, InputNumberPropertyComponent, TablePropertyComponent,
    UploadPropertyComponent, PagePropertyComponent, SelectPropertyComponent,
    RadioPropertyComponent, DatepickerPropertyComponent, ScalePropertyComponent,
    PrintPropertyComponent } from 'app/edit-comp/properties';
import { IDataTable } from './data';

export interface IEditDynamic {
    config: IComponent;
    type: string;
}

export interface RawPosition {
    left: number;
    top: number;
}

export interface ItemDimension {
    width: number;
    height: number;
}

export interface IDynamicComponent {
    config: IComponent;
}

export const DYNAMIC_COMPONENTS: { [type: string]: Type<IDynamicComponent> } = {
    button: ButtonComponent,
    container: ContainerComponent,
    checkbox: CheckboxComponent,
    datepicker: DatepickerComponent,
    input: InputComponent,
    inputnumber: InputNumberComponent,
    print: PrintComponent,
    radio: RadioComponent,
    scale: ScaleComponent,
    select: SelectComponent,
    table: TableComponent,
    upload: UploadComponent
};

export interface IDynamicProperty {
    config: IComponent | IPage;
    transList: {key: string, value: string}[];
    dataTables: IDataTable[];
    localActions: string[];
}

export const DYNAMIC_PROPERTIES: { [type: string]: Type<IDynamicProperty> } = {
    button: ButtonPropertyComponent,
    container: ContainerPropertyComponent,
    input: InputPropertyComponent,
    checkbox: CheckboxPropertyComponent,
    select: SelectPropertyComponent,
    radio: RadioPropertyComponent,
    inputnumber: InputNumberPropertyComponent,
    datepicker: DatepickerPropertyComponent,
    table: TablePropertyComponent,
    scale: ScalePropertyComponent,
    print: PrintPropertyComponent,
    upload: UploadPropertyComponent,
    page: PagePropertyComponent};

