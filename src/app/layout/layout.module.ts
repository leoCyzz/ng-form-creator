import { NgModule } from '@angular/core';
import { LayoutDefaultComponent } from './default/default.component';
import { SharedModule } from '../shared';

const COMPONENTS = [
  LayoutDefaultComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class LayoutModule { }
