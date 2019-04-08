import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { RoutesRoutingModule } from './routes-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { SketchComponent } from './sketch/sketch.component';
import { SettingsComponent } from './settings/settings.component';

const COMPONENTS = [
  IndexComponent,
  EditComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    SketchComponent,
    SettingsComponent
  ],
  imports: [
    SharedModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
