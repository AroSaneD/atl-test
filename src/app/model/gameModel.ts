import { Game } from './game';

export class GameModel {
    games: Map<string, Game> = new Map([]);
    // [id: string]: Game;

    constructor() {
        this.games = new Map([
            ...this.games,
            ['Rocket league', new Game()],
            ['CSGO', new Game()]
        ]);
    }
}
