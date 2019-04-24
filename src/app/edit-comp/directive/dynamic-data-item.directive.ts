import { Directive, OnInit, OnChanges, SimpleChanges, Input, ComponentFactoryResolver,
    ViewContainerRef, ComponentRef} from '@angular/core';
import { IOperatorData, IDataTable, IDataGroup } from 'app/model/data';
import { IFormComponent } from 'app/model/component';
import { CompDataComponent } from '../properties/common';
import { IDynamicDataItem } from 'app/model/dynamic';

@Directive({
    selector: '[fcDynamicDataItem]',
})
export class DynamicDataItemDirective implements OnInit, OnChanges {
    @Input() dataItems: {[key: string]: IOperatorData};
    @Input() currentComp: IFormComponent;
    @Input() dataTables: IDataTable[];
    @Input() dataGroups: IDataGroup[];
    component: ComponentRef<IDynamicDataItem>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
    ) { }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('currentComp')) {
            this.container.clear();
            this.component = null;
            const component = this.resolver.resolveComponentFactory<IDynamicDataItem>(CompDataComponent);
            this.component = this.container.createComponent(component);
            this.component.instance.dataItem = this.dataItems[changes.currentComp.currentValue.id];
        }

        this.component.instance.dataTables = this.dataTables;
        this.component.instance.dataGroups = this.dataGroups;
    }

}
