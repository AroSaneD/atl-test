import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { UrlRecognitionService } from './url-recognition.service';
import { Game } from '../model/game';

@Injectable({ providedIn: 'root' })
export class SearchAttributeResolver implements Resolve<any> {
    constructor(
        private urlRecognizer: UrlRecognitionService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const gameName = route.paramMap.get('game');
        this.urlRecognizer
            .getActiveGameByUrlName(gameName)
            .pipe(
                map((game: Game) =>
                    this.urlRecognizer.getReruoteUrl(gameName, game)
                )
            )
            .subscribe(url => this.router.navigate([url]));

        return null;
    }
}
