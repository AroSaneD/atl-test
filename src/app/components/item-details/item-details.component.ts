import { Component, OnInit } from '@angular/core';
import { Offer } from 'model/offer';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterItemDetailsData } from 'model/routerItemDetailsData';
import { map, filter } from 'rxjs/operators';
import { MockServerService } from 'services/mock-server.service';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
    itemName: Observable<string>;
    gameName: Observable<string>;
    attributes: Observable<{ name: string; value: string }[]>;
    offers: Observable<Offer[]>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private mockServer: MockServerService
    ) {}

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

        // always get offers from server, because caching them might
        // not awlays be a good idea (when an offer goes out of
        // stock or something)
        this.offers = this.mockServer.getOffers();
    }
}
