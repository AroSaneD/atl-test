import { State, Action, Store } from '@ngxs/store';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MockServerService } from 'services/mock-server.service';

import { GameModel } from 'model/gameModel';
import { Game } from 'model/game';


export class EnsureModel {
    static readonly type = 'EnsureModel';
}

export class AddGameItems {
    static readonly type = 'AddGameItems';
}

@State<GameModel>({
    name: 'gameModel',
    defaults: new GameModel()
})
export class ModelState {
    constructor(private serverService: MockServerService) {}

    @Action(EnsureModel)
    ensureModel({ getState, setState }) {
        const state = getState() as GameModel;
        if (!state.loaded) {
            return this.serverService.getGameModel().pipe(
                tap(modelResult => {
                    const gameMap = new Map<string, Game>(
                        Object.entries(modelResult)
                    );

                    const newModel = new GameModel();
                    newModel.games = gameMap;
                    newModel.loaded = true;

                    setState(newModel);
                })
            );
        } else {
            return of(state.loaded);
        }
    }

    @Action(AddGameItems)
    add({ getState, setState }) {
        const state = getState();
        // todo: read about payloads in ngxs
        setState(state);
    }
}
