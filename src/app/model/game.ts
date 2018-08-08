import { GameItem } from './gameItem';

export class Game {
    image_url = 'test_url_1';
    attributes: { [id: string]: string[] };
    items: GameItem[];
    constructor() {
        this.attributes = {
            rarity: ['common', 'rare', 'epic']
        };
        this.items = [];
    }
}
