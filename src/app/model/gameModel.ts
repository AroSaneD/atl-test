import { Game } from './game';

export class GameModel {
    games: Map<string, Game> = new Map([]);
    loaded = false;

    constructor() {}
}
