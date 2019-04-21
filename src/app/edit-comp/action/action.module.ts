import { NgModule } from '@angular/core';
import { ActionComponent } from './action.component';
import { SharedModule } from '@shared';
import { PipeModule } from '../pipe/pipe.module';
import { QueryActionComponent } from './query/query.component';
import { SaveActionComponent } from './save/save.component';
import { ImportActionComponent } from './import/import.component';
import { ExportActionComponent } from './export/export.component';
import { PrintActionComponent } from './print/print.component';
import { ViewActionComponent } from './view/view.component';
import { PropertyCommonModule } from '../properties/common/common.module';

const COMPONENTS = [
  ActionComponent,
  QueryActionComponent,
  SaveActionComponent,
  ImportActionComponent,
  ExportActionComponent,
  PrintActionComponent,
  ViewActionComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    PipeModule,
    PropertyCommonModule,
    SharedModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ActionModule { }
