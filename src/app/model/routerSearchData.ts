import { Game } from './game';
import { SearchField } from 'model/searchField';

export interface RouterSearchData {
    game: Game;
    searchFields: SearchField[];
    gameName: string;
}
