import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FormCreatorHttpService } from '@core/net/form-creator-http.service';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EditResolverService implements Resolve<any> {
    constructor(private fcHttpService: FormCreatorHttpService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const pageId = route.paramMap.get('id');
        if (pageId) {
            return this.fcHttpService.getEditPageInfo(pageId).pipe(
                take(1),
                mergeMap((res: any) => {
                    const config = res.status === 'success' ? res.config : null;
                    return of(config);
                })
            );
        } else {
            return of(null);
        }
    }

}
