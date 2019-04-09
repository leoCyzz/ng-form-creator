import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { RoutesRoutingModule } from './routes-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';

import { EditCompModule } from 'app/edit-comp/edit-comp.module';

const COMPONENTS_PAGE = [
  IndexComponent,
  EditComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS_PAGE
  ],
  imports: [
    EditCompModule,
    SharedModule,
    RoutesRoutingModule
  ],

})
export class RoutesModule { }
