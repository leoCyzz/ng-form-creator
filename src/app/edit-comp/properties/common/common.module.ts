import { NgModule } from '@angular/core';
import { DataGroupComponent, DataItemComponent, CompDefaultComponent, FormDefaultComponent,
     OperatorDataComponent, ExtraFuncComponent, CompDataComponent } from '.';
import { SharedModule } from '@shared';
import { PipeModule } from 'app/edit-comp/pipe/pipe.module';

const EDIT_COMMON = [
    DataGroupComponent,
    DataItemComponent,
    CompDefaultComponent,
    FormDefaultComponent,
    OperatorDataComponent,
    ExtraFuncComponent,
    CompDataComponent
];

@NgModule({
    declarations: [
        ...EDIT_COMMON
    ],
    imports: [
        PipeModule,
        SharedModule
    ],
    exports: [
        ...EDIT_COMMON
    ],
    providers: [],
})
export class PropertyCommonModule {}