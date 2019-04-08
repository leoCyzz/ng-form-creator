import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionComponent } from './exception/exception.component';

const COMPONENTS = [
  ExceptionComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CcModule { }
