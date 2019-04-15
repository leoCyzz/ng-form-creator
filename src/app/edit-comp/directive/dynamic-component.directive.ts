import { Directive, Input, ComponentRef, ComponentFactoryResolver, ViewContainerRef,
    OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { IComponent } from 'app/model/component';
import { IDynamicComponent, DYNAMIC_COMPONENTS } from 'app/model/dynamic';
import { SketchService } from '../service/sketch.service';

@Directive({
    selector: '[fcDynamicComponent]'
})
export class DynamicComponentDirective implements OnInit, OnChanges, AfterViewInit {
    @Input() config: IComponent;
    @Input() parentId: string;
    @Input() translation: any;
    @Input() isDraging: boolean;
    components = DYNAMIC_COMPONENTS;
    component: ComponentRef<IDynamicComponent>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private sketchService: SketchService
    ) { }

    ngOnInit(): void {
        if (!this.components[this.config.type]) {
        const supportedTypes = Object.keys(this.component).join(', ');
        throw new Error(
            `Trying to use an unsupported type (${this.config.type}).
            Supported types: ${supportedTypes}`
        );
        }

        const component = this.resolver.resolveComponentFactory<IDynamicComponent>(this.components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.component) {
            this.component.instance.config = this.config;
        }
    }

    ngAfterViewInit(): void {
        if (this.isDraging) { return; }
        this.sketchService.addComponent(this);
    }
}
