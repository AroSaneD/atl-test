import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { EnsureModel } from './model/model.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private store: Store) {
        this.store.dispatch(new EnsureModel()).subscribe(m => console.log(m));
    }
}
