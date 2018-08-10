import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { GameModel } from 'model/gameModel';
import { Game } from 'model/game';
import { GameThumbnail } from 'model/gameThumbnail';

import { ModelState } from 'store/model.state';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
    @Select((state: { gameModel: GameModel }) => {
        return Array.from(state.gameModel.games).map(
            ([name, game]) => new GameThumbnail(name, game.image_url)
        );
    })
    games: Observable<GameThumbnail[]>;

    constructor() {
    }

    ngOnInit() {}
}
