import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterItemDetailsData } from 'model/routerItemDetailsData';
import { Select } from '@ngxs/store';
import { ModelState } from 'store/model.state';
import { GameModel } from 'model/gameModel';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemDetailsResolverService implements Resolve<any> {
    @Select(ModelState)
    gameModel: Observable<GameModel>;

    constructor() {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<RouterItemDetailsData> {
        const segments = route.url;
        const itemId = segments[0].path;

        return this.gameModel.pipe(
            filter(m => m.loaded),
            map(m => m.games),
            map(gameMap => {
                const games = Array.from(gameMap);
                const containId = games
                    .map(([gameKey, g]) => {
                        const items = Array.from(Object.entries(g.items));
                        const itemWithId = items.find(([itemKey, i]) => i.id === itemId);
                        return itemWithId
                            ? {
                                  gameKey,
                                  game: g,
                                  itemKey: itemWithId[0],
                                  item: itemWithId[1]
                              }
                            : null;
                    })
                    .filter(r => r != null);
                return !!containId.length ? containId[0] : null;
            }),
            filter(result => result != null),
            map(
                ({ gameKey, game, itemKey, item }) =>
                    new RouterItemDetailsData(game, gameKey, item, itemKey)
            ),
            take(1)
        );
    }
}
