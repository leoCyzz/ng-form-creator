import { IComponent } from './component';
import { Type } from '@angular/core';
import { ButtonComponent, ContainerComponent, CheckboxComponent, DatepickerComponent,
    InputComponent, InputNumberComponent, PrintComponent, ScaleComponent, SelectComponent,
    TableComponent, UploadComponent, RadioComponent } from '../components';

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

