import { Injectable, ElementRef } from '@angular/core';
import { DynamicComponentDirective } from '../directive/dynamic-component.directive';
import { ILayoutComponent } from 'app/model/component';

@Injectable({
    providedIn: 'root'
  })
export class SketchService {
    editComps: Map<string, any> = new Map();
    compNames: Map<string, string> = new Map();

    addComponent(item: DynamicComponentDirective) {
        this.compNames.set(item.config.id, item.config.name);
        this.editComps.set(item.config.id, item);
    }

    removeComponent(selectorId: string) {
        const compDirective = this.editComps.get(selectorId);
        if (compDirective) {
            const compConfig = compDirective.config;
            if (compConfig.type !== 'container') {
                this.editComps.delete(selectorId);
                this.compNames.delete(selectorId);
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
                this.compNames.delete(childConfig.id);
            }
        });
        this.editComps.delete(config.id);
        this.compNames.delete(config.id);
    }

    getCompNames() {
        const compNameArray = [];
        this.compNames.forEach((name, id) => {
            if (name) {
                compNameArray.push({id, name});
            }
        });
        return compNameArray;
    }
}
