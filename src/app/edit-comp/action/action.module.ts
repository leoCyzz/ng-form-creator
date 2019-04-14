import { NgModule } from '@angular/core';
import { ActionComponent } from './action.component';
import { SharedModule } from '@shared';

const COMPONENTS = [
  ActionComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ActionModule { }
