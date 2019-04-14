import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [EventComponent],
  imports: [
    SharedModule
  ],
  exports: [EventComponent]
})
export class EventModule { }
