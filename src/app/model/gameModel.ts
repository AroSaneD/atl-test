import { Game } from './game';

export class GameModel {
    name = 'test';
    games: Game[];

    constructor() {
        this.games = [new Game()];
    }
}
