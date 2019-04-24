import { Injectable } from '@angular/core';
import { DynamicComponentDirective } from '../directive/dynamic-component.directive';
import { ILayoutComponent, IComponent } from 'app/model/component';
import { IPage } from 'app/model/page';

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

    removeComponent(selectorId: string, pageConfig: IPage) {
        const compDirective = this.editComps.get(selectorId);
        if (compDirective) {
            const compConfig = compDirective.config;
            this.deleteContainerComponent(compConfig, pageConfig);
        }
    }

    deleteComponent(id: string, pageConfig: IPage) {
        this.editComps.delete(id);
        this.compNames.delete(id);
        delete pageConfig.dataItems[id];
        delete pageConfig.remotes[id];
    }

    deleteContainerComponent(config: IComponent, pageConfig: IPage) {
        if (config.type !== 'container') {
            this.deleteComponent(config.id, pageConfig);
        } else {
            (config as ILayoutComponent).forEach(childConfig => {
                this.deleteContainerComponent(childConfig, pageConfig);
            });
            this.editComps.delete(config.id);
            this.compNames.delete(config.id);
        }
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
