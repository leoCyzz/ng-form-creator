import { NgModule } from '@angular/core';
import { DataTableFilterPipe, DataGroupFilterPipe } from '.';

const EDIT_PIPE = [
    DataTableFilterPipe,
    DataGroupFilterPipe
  ];

@NgModule({
  declarations: [
    ...EDIT_PIPE
  ],
  exports: [
    ...EDIT_PIPE
  ]
})
export class PipeModule { }
