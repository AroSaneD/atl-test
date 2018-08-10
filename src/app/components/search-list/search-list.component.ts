import { Component, OnInit, Input } from '@angular/core';
import { SearchField } from 'model/searchField';
import { GameItem } from 'model/gameItem';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
    @Input()
    items: [string, GameItem][];

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            console.log(this.items);
        }, 500);
    }
}
