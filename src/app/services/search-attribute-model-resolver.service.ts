import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, first } from 'rxjs/operators';
import { UrlRecognitionService } from './url-recognition.service';
import { RouterSearchData } from '../model/routerSearchData';
import { SearchField } from 'model/searchField';

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
    ): Observable<RouterSearchData> {
        const segments = route.url;
        const gameName = segments[0].path;
        const searchSegments = segments.slice(1, -1).map(s => s.path);

        const data = this.urlRecognizer.getActiveGameByUrlName(gameName).pipe(
            first(),
            map(game => ({ game, attributes: searchSegments })),
            map(m => {
                const attributes = Object.keys(m.game.attributes);
                const searchFields = attributes.map(
                    (a, i) =>
                        new SearchField(
                            a,
                            m.attributes[i],
                            m.game.attributes[a]
                        )
                );
                return { game: m.game, searchFields, gameName };
            })
        );

        return data;
    }
}
