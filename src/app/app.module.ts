import { BrowserModule } from '@angular/platform-browser';
import {
    RouterModule,
    Routes,
    UrlSegment,
    UrlSegmentGroup,
    Route,
    UrlMatchResult
} from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { GameComponent } from './components/game/game.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

function searchMatcher(
    url: UrlSegment[],
    group: UrlSegmentGroup,
    route: Route
): UrlMatchResult {
    const valid = url.length >= 2 && url[url.length - 1].path === 'search';
    return valid ? {consumed: url} : null;
}

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'search', component: SearchComponent },
    { matcher: searchMatcher, component: SearchComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        GameListComponent,
        SearchComponent,
        SearchListComponent,
        GameComponent,
        SearchItemComponent,
        ItemDetailsComponent
    ],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
