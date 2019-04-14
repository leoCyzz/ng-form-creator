import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FormCreatorHttpService {
    constructor(
        private http: HttpClient
    ) {}

    getPageList(searchValue: string = '', pageIndex: number = 1, pageSize: number = 10) {
        const params = new HttpParams()
            .append('title', `${searchValue}`)
            .append('index', `${pageIndex}`)
            .append('size', `${pageSize}`);
        return this.http.get('getPageList', {params});
    }

    getEditPageInfo(id: string) {
        const params = new HttpParams()
            .append('id', `${id}`);
        return this.http.get('getEditPageInfo', {params});
    }

    getTableList() {
        return this.http.get('getTableList');
    }

    getLocalActionList() {
        return this.http.get('getLocalActionList');
    }
}
