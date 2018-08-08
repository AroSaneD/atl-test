import { Game } from './game';

export class GameModel {
    [id: string]: Game;

    constructor() {
        this['Rocket league'] = new Game();
        this['CSGO'] = new Game();
    }
}
