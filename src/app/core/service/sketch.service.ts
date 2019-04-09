import { Injectable, ElementRef } from '@angular/core';
import { DynamicComponentDirective } from '../../edit-comp/directive/dynamic-component.directive';
import { ILayoutComponent } from 'app/model/component';

@Injectable({
    providedIn: 'root'
  })
export class SketchService {
    editComps: Map<string, any> = new Map();
    addComponent(item: DynamicComponentDirective) {
        this.editComps.set(item.config.id, item);
    }

    removeComponent(selectorId: string) {
        const compDirective = this.editComps.get(selectorId);
        if (compDirective) {
            const compConfig = compDirective.config;
            if (compConfig.type !== 'container') {
                this.editComps.delete(selectorId);
            } else {
                this.deleteContainerComponent(compConfig);
            }
        }
    }

    deleteContainerComponent(config: ILayoutComponent) {
        config.children.forEach(childConfig => {
            if (childConfig.type === 'container') {
                this.deleteContainerComponent(childConfig as ILayoutComponent);
            } else {
                this.editComps.delete(childConfig.id);
            }
        });
        this.editComps.delete(config.id);
    }
}
