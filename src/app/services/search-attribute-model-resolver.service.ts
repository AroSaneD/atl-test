import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    PRIMARY_OUTLET
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, first } from 'rxjs/operators';
import { UrlRecognitionService } from './url-recognition.service';
import { RouterSearchData } from '../model/routerSearchData';

@Injectable({
    providedIn: 'root'
})
export class SearchAttributeModelResolver implements Resolve<any> {
    constructor(
        private urlRecognizer: UrlRecognitionService /*private router: Router*/
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const segments = route.url;
        const gameName = segments[0].path;
        const searchSegments = segments.slice(1, -1).map(s => s.path);

        const data = this.urlRecognizer.getActiveGameByUrlName(gameName).pipe(
            first(),
            map(game => ({ game, attributes: searchSegments }))
        );

        return data;
        // return of(1233);

        // const url = this.router.url;
        // const tree = this.router.parseUrl(url);
        // const group = tree.root.children[PRIMARY_OUTLET];
        // if (group) {
        //     const segments = group.segments;
        // }

        // todo: extract attributes from url and game, match to model, pass to route
        // hardcoded for now, later implement generics
        // const gameName = route.paramMap.get('game');
        // const attributes = route.paramMap.keys;
        // // todo: re
        // return of({ name: 'test' }).pipe(take(1));
    }
}
