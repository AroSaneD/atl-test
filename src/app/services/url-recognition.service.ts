import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Select } from '@ngxs/store';

import { GameModel } from '../model/gameModel';
import { ModelState } from '../model/model.state';
import { Game } from '../model/game';

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

    getReruoteUrl(gameName: string, game: Game): string {
        const attributes = this.getAttributes(game);
        const defaultAttributes = attributes.map(a => game.attributes[a][0]);

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
