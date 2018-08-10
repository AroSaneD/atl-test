import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
    selector: 'app-attribute-selector',
    templateUrl: './attribute-selector.component.html',
    styleUrls: ['./attribute-selector.component.scss']
})
export class AttributeSelectorComponent implements OnInit {
    @Input()
    attributeName: string;

    @Input()
    currentValue: string;

    @Input()
    possibleValues: string[];

    @Output()
    attrChange: EventEmitter = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onChange(value) {
        console.log('Selected value: ', value);
    }
}
