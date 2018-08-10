import { Component, OnInit, Input } from '@angular/core';
import { GameItem } from 'model/gameItem';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[app-search-item]',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
    @Input()
    name: string;

    @Input()
    item: GameItem;

    get itemLink(): string {
        return this.item ? `/${this.item.id}/detail` : null;
    }

    constructor() {}

    ngOnInit() {}
}
