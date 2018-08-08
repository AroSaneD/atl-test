import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GameModel } from '../../model/gameModel';
import { ModelState } from '../../model/model.state';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    @Select(ModelState) state$: Observable<GameModel>;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            console.log(data);
        });

        this.state$.subscribe(state => {
          console.log('State: ', state);
      });
    }
}
