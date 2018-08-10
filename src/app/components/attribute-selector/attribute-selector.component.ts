import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SearchField } from 'model/searchField';

@Component({
    selector: 'app-attribute-selector',
    templateUrl: './attribute-selector.component.html',
    styleUrls: ['./attribute-selector.component.scss']
})
export class AttributeSelectorComponent implements OnInit {
    public searchField: SearchField;
    @Input()
    set field(value: SearchField) {
        // add an extra option 'any', which essentialy means to ignore the filter
        if (value) {
            const extendedPossibleValues = ['any', ...value.possibleValues];
            const val = { ...value, possibleValues: extendedPossibleValues };
            this.searchField = val;
        }
    }

    @Output()
    attrChange: EventEmitter<SearchField> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onChange(value) {
        const emitValue = { ...this.searchField, value: value };
        this.attrChange.emit(emitValue);
    }
}
