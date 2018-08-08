import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchAttributeResolver implements Resolve<any> {
    constructor() {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        // hardcoded for now, later implement generics
        // const gameName = route.paramMap.get('game');
        // const attributes = route.paramMap.keys;
        return of({ name: 'test' })
            .pipe(take(1));
    }
}
