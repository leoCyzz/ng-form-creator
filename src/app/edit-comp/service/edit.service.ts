import { Injectable } from '@angular/core';
import { IDataTable } from 'app/model/data';

@Injectable({
    providedIn: 'root'
})
export class EditService {
    private compNames: string[] = [];

    isRepeat(name: string) {
        return this.compNames.indexOf(name) !== -1;
    }

    addName(name: string) {
        if (!this.isRepeat(name)) {
            this.compNames.push(name);
        }
    }

    removeName(name: string) {
        const index = this.compNames.indexOf(name);
        if (index !== -1) {
            this.compNames.splice(index, 1);
        }
    }
}
