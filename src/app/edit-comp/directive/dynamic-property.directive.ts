import { Directive, OnInit, OnChanges, Input, ComponentFactoryResolver, ViewContainerRef,
    SimpleChanges, ComponentRef } from '@angular/core';
import { IComponent } from 'app/model/component';
import { DYNAMIC_PROPERTIES, IDynamicProperty } from 'app/model/dynamic';
import { IDataTable } from 'app/model/data';

@Directive({
    selector: '[fcDynamicProperty]',
})
export class DynamicPropertyDirective implements OnInit, OnChanges {
    @Input() config: IComponent;
    @Input() type: string;
    @Input() transList: {key: string, value: string}[];
    @Input() dataTables: IDataTable[];
    @Input() localActions: string[];

    components = DYNAMIC_PROPERTIES;
    component: ComponentRef<IDynamicProperty>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
    ) { }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.components[this.type]) {
            const supportedTypes = Object.keys(this.component).join(', ');
            throw new Error(
                `Trying to use an unsupported type (${this.type}).
                Supported types: ${supportedTypes}`
            );
        }

        if (changes.hasOwnProperty('type')) {
            this.container.clear();
            this.component = null;
            const component = this.resolver.resolveComponentFactory<IDynamicProperty>(this.components[this.type]);
            this.component = this.container.createComponent(component);
        }

        if (changes.hasOwnProperty('config')) {
        this.component.instance.config = this.config;
        }
        this.component.instance.transList = this.transList;
        this.component.instance.dataTables = this.dataTables;
        this.component.instance.localActions = this.localActions;
    }
}
