import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SearchField } from 'model/searchField';

@Component({
    selector: 'app-attribute-selector',
    templateUrl: './attribute-selector.component.html',
    styleUrls: ['./attribute-selector.component.scss']
})
export class AttributeSelectorComponent implements OnInit {
    @Input()
    field: SearchField;

    @Output()
    attrChange: EventEmitter<SearchField> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onChange(value) {
        const emitValue = { ...this.field, value: value };
        console.log('Selected value: ', emitValue);
        this.attrChange.emit(emitValue);
    }
}
