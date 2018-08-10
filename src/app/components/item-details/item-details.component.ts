import { Component, OnInit } from '@angular/core';
import { Offer } from 'model/offer';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterItemDetailsData } from 'model/routerItemDetailsData';
import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
    offers: Offer[] = [
        new Offer('joh23', 99, 20, 2.95),
        new Offer('willer23', 95, 1, 2.5),
        new Offer('mcree42', 90, 5, 3)
    ];

    itemName: Observable<string>;
    gameName: Observable<string>;
    attributes: Observable<{ name: string; value: string }[]>;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        const data$: Observable<RouterItemDetailsData> = this.activatedRoute.data.pipe(
            map((d: any) => d.details),
            filter(d => d)
        );

        this.itemName = data$.pipe(map(d => d.itemName));
        this.gameName = data$.pipe(map(d => d.gameName));
        this.attributes = data$.pipe(
            map(d =>
                Object.entries(d.item.attributes).map(([name, value]) => ({
                    name,
                    value
                }))
            )
        );
    }
}
