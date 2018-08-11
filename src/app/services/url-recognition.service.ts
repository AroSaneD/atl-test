import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { GameModel } from 'model/gameModel';
import { Game } from 'model/game';

import { ModelState } from 'store/model.state';
import { SearchField } from 'model/searchField';

@Injectable({
    providedIn: 'root'
})
export class UrlRecognitionService {
    @Select(ModelState)
    state$: Observable<GameModel>;

    constructor() {}

    getActiveGameByUrlName(urlName: string): Observable<Game> {
        return this.state$.pipe(
            filter(m => m.loaded),
            map(model => {
                const key = this._getMatchingKey(model.games, urlName);
                return { games: model.games, key };
            }),
            map(({ games, key }) => games.get(key))
        );
    }

    getAttributes(game: Game): string[] {
        return Object.keys(game.attributes);
    }

    getReruoteUrl(
        gameName: string,
        game: Game,
        attrValues: Map<string, string> = null
    ): string {
        const attributes = this.getAttributes(game);
        const defaultAttributes = attributes.map(
            a => (attrValues ? attrValues.get(a) : 'any')
        );

        const rerouteUrl =
            '/' + [gameName, ...defaultAttributes, 'search'].join('/');

        return rerouteUrl;
    }

    private _getMatchingKey(
        gameMap: Map<string, Game>,
        gameName: string
    ): string {
        const searchName = gameName.replace('-', ' ');
        const keys = Array.from(gameMap.keys());
        const matchingKey = keys.find(
            k => k.toLowerCase().indexOf(searchName) !== -1
        );

        return matchingKey;
    }
}
