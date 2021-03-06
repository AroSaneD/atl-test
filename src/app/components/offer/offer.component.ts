import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../../model/offer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-offer]',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input()
  offer: Offer;

  constructor() { }

  ngOnInit() {
  }

}
