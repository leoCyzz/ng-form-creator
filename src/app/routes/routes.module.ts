import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { RoutesRoutingModule } from './routes-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { SketchComponent } from './sketch/sketch.component';
import { SettingsComponent } from './settings/settings.component';
import { ButtonComponent, ContainerComponent, CheckboxComponent, DatepickerComponent, InputComponent,
  InputNumberComponent, RadioComponent, SelectComponent, ScaleComponent, TableComponent, UploadComponent,
  PrintComponent } from '../components';
import { DynamicComponentDirective } from '../core/directive/dynamic-component.directive';
import { SketchDragComponent, SketchHoverComponent, SketchSelectComponent } from './sketch';

const COMPONENTS_PAGE = [
  IndexComponent,
  EditComponent,
  SketchComponent,
  SettingsComponent
];

const COMPONENT_FORM = [
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

const COMPONENT_SKETCH = [
  SketchDragComponent,
  SketchHoverComponent,
  SketchSelectComponent
];

const COMPONENT_DIRECTIVE = [
  DynamicComponentDirective,
];

@NgModule({
  declarations: [
    ...COMPONENTS_PAGE,
    ...COMPONENT_FORM,
    ...COMPONENT_SKETCH,
    ...COMPONENT_DIRECTIVE
  ],
  imports: [
    SharedModule,
    RoutesRoutingModule
  ],
  entryComponents: [
    ...COMPONENT_FORM,
    ...COMPONENT_SKETCH
  ]
})
export class RoutesModule { }
