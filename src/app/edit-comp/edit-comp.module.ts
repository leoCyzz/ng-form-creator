import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ButtonComponent, ContainerComponent, CheckboxComponent, DatepickerComponent, InputComponent,
  InputNumberComponent, PrintComponent, RadioComponent, SelectComponent, ScaleComponent, TableComponent,
  UploadComponent } from './components';
import { SketchComponent } from './sketch/sketch.component';
import { SettingsComponent } from './settings/settings.component';
import { SketchDragComponent, SketchHoverComponent, SketchSelectComponent } from './sketch';
import { DynamicComponentDirective } from './directive/dynamic-component.directive';
import { ButtonPropertyComponent, CheckboxPropertyComponent, ContainerPropertyComponent,
  DatepickerPropertyComponent, InputPropertyComponent, InputNumberPropertyComponent, PagePropertyComponent,
  PrintPropertyComponent, RadioPropertyComponent, ScalePropertyComponent, SelectPropertyComponent,
  TablePropertyComponent, UploadPropertyComponent } from './properties';
import { DynamicPropertyDirective } from './directive/dynamic-property.directive';
import { DataGroupComponent, DataItemComponent } from './properties/common';
import { DataTableFilterPipe, DataGroupFilterPipe } from './pipe';
import { ActionModule } from './action/action.module';
import { EventModule } from './event/event.module';
import { FormDefaultComponent } from './properties/common/form-default/form-default.component';
import { CompDefaultComponent } from './properties/common/comp-default/comp-default.component';

const EDIT_PAGES = [
  SketchComponent,
  SettingsComponent
];
const EDIT_COMPONENTS = [
  ButtonComponent,
  ContainerComponent,
  CheckboxComponent,
  DatepickerComponent,
  InputComponent,
  InputNumberComponent,
  PrintComponent,
  RadioComponent,
  SelectComponent,
  ScaleComponent,
  TableComponent,
  UploadComponent
];
const EDIT_SKETCH = [
  SketchDragComponent,
  SketchHoverComponent,
  SketchSelectComponent
];
const EDIT_DIRECTIVE = [
  DynamicComponentDirective,
  DynamicPropertyDirective
];
const EDIT_PROPERTIES = [
  ButtonPropertyComponent,
  CheckboxPropertyComponent,
  ContainerPropertyComponent,
  DatepickerPropertyComponent,
  InputPropertyComponent,
  InputNumberPropertyComponent,
  PagePropertyComponent,
  PrintPropertyComponent,
  RadioPropertyComponent,
  ScalePropertyComponent,
  SelectPropertyComponent,
  TablePropertyComponent,
  UploadPropertyComponent
];
const EDIT_COMMON = [
  DataGroupComponent,
  DataItemComponent,
  CompDefaultComponent,
  FormDefaultComponent,
];
const EDIT_PIPE = [
  DataTableFilterPipe,
  DataGroupFilterPipe
];

@NgModule({
  declarations: [
    ...EDIT_PAGES,
    ...EDIT_COMPONENTS,
    ...EDIT_SKETCH,
    ...EDIT_DIRECTIVE,
    ...EDIT_PROPERTIES,
    ...EDIT_COMMON,
    ...EDIT_PIPE,
    FormDefaultComponent,
    CompDefaultComponent
  ],
  imports: [
    SharedModule,
    ActionModule,
    EventModule
  ],
  exports: [
    ...EDIT_PAGES,
    ...EDIT_COMPONENTS,
    ...EDIT_SKETCH,
    ...EDIT_DIRECTIVE,
    ...EDIT_PROPERTIES,
    ...EDIT_COMMON,
    ...EDIT_PIPE
  ],
  entryComponents: [
    ...EDIT_COMPONENTS,
    ...EDIT_SKETCH,
    ...EDIT_PROPERTIES
  ]
})
export class EditCompModule { }
