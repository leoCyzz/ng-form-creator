import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CcModule } from './cc/cc.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const THIRD_MODULES = [
  NgZorroAntdModule,
  CcModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [];
const DIRECTIVES = [];
// #endregion


@NgModule({
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // third libs
    ...THIRD_MODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // third libs
    ...THIRD_MODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
