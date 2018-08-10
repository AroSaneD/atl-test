import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { map, filter, first, withLatestFrom } from 'rxjs/operators';

import { RouterSearchData } from 'model/routerSearchData';
import { SearchField } from 'model/searchField';
import { GameModel } from 'model/gameModel';
import { Game } from 'model/game';

import { ModelState } from 'store/model.state';
import { UrlRecognitionService } from 'services/url-recognition.service';
import { GameItem } from 'model/gameItem';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    @Select(ModelState)
    state$: Observable<GameModel>;

    data: RouterSearchData;
    searchFields: Observable<SearchField[]>;
    filteredItems: Observable<[string, GameItem][]>;
    onSearchField = new Subject<SearchField>();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private urlRecognizer: UrlRecognitionService
    ) {}

    async ngOnInit() {
        const data$: Observable<RouterSearchData> = this.activatedRoute.data.pipe(
            map((d: any) => d.search),
            filter(d => d)
        );
        this.searchFields = data$.pipe(map(d => d.searchFields));
        this.filteredItems = data$.pipe(
            map(d => d.game.items),
            map(items => Object.entries(items)),
            withLatestFrom(this.searchFields),
            map(([entries, fields]) => {
                const newEntries = entries.filter(([k, v]) => {
                    const match = SearchField.doesMatchAttributes(v, fields);
                    return match;
                });
                return newEntries;
            })
            // map(entries => new Map(entries))
        );

        this.data = await data$.pipe(first()).toPromise();

        this.onSearchField.pipe(withLatestFrom(data$)).subscribe(([field, data]) => {
            let newFields = data.searchFields.filter(f => f.name !== field.name);
            newFields = [...newFields, field];

            const mapped = newFields.map(f => [f.name, f.value]) as any;
            const newUrl = this.urlRecognizer.getReruoteUrl(
                this.data.gameName,
                this.data.game,
                new Map<string, string>(mapped)
            );

            this.router.navigate([newUrl]);
        });

        // this.searchFields = this.data.searchFields;
        // this.router.events.subscribe(ev => {
        //     console.log('event: ', ev);
        // });
        // )
        // .subscribe((fields: SearchField[]) => {
        //     console.log('Fields: ', fields);
        // });

        //   this.state$.subscribe(state => {
        //     console.log('State: ', state);
        // });
    }

    // onChange(v: any) {
    //     console.log(this.searchFields);
    //     const mapped = this.data.searchFields.map(f => [f.name, f.value]) as any;
    //     const newUrl = this.urlRecognizer.getReruoteUrl(
    //         this.data.gameName,
    //         this.data.game,
    //         new Map<string, string>(mapped)
    //     );

    //     this.router.navigate([newUrl]);
    // }
}
