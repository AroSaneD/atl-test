import { Game } from 'model/game';
import { GameItem } from 'model/gameItem';

export class RouterItemDetailsData {
    constructor(public game: Game, public gameName: string, public item: GameItem, public itemName: string) {}
}
