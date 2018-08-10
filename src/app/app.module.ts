import { BrowserModule } from '@angular/platform-browser';
import {
    RouterModule,
    Routes,
    UrlSegment,
    UrlSegmentGroup,
    Route,
    UrlMatchResult
} from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import {
    HomeComponent,
    SearchComponent,
    ItemDetailsComponent,
    components
} from './components';

import {
    SearchAttributeResolver,
    SearchAttributeModelResolver,
    services
} from 'services';

import { ModelState } from 'store/model.state';

export function searchMatcher(
    url: UrlSegment[],
    group: UrlSegmentGroup,
    route: Route
): UrlMatchResult {
    const valid = url.length >= 2 && url[url.length - 1].path === 'search';
    return valid ? { consumed: url } : null;
}

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'search', component: SearchComponent },
    // todo: implement redux, so the resolvers will have access to game data
    // todo: implement an intermediate path, that would resolve the attributes from the current data
    {
        path: ':game',
        component: SearchComponent,
        resolve: { t: SearchAttributeResolver }
    },
    {
        matcher: searchMatcher,
        component: SearchComponent,
        resolve: { search: SearchAttributeModelResolver }
    },
    {
        path: ':item/detail',
        component: ItemDetailsComponent
        // todo: resolver
    },
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [AppComponent, ...components],
    imports: [
        BrowserModule,
        NgSelectModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        NgxsModule.forRoot([ModelState])
    ],
    providers: [...services],
    bootstrap: [AppComponent]
})
export class AppModule {}
