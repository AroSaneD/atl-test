import { State, Action } from '@ngxs/store';
import { GameModel } from './gameModel';

export class AddGameItems {
  static readonly type = 'AddGameItems';
}

@State<GameModel>({
  name: 'gameModel',
  defaults: new GameModel()
})
export class ModelState {
  @Action(AddGameItems)
  add({ getState, setState }) {
    const state = getState();
    // todo: read about payloads in ngxs
    setState(state);
  }
}
