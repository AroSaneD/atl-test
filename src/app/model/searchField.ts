import { GameItem } from 'model/gameItem';

export class SearchField {
    constructor(
        public name: string,
        public value: string,
        public possibleValues: string[]
    ) {}

    static doesMatchAttributes(item: GameItem, fields: SearchField[]) {
        for (const f of fields) {
            if (f.value === 'any') {
                continue;
            } else if (item.attributes[f.name] !== f.value) {
                return false;
            }
        }

        return true;
    }
}
