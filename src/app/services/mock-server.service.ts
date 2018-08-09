import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MockServerService {
    constructor() {}

    getGameModel(): Observable<any> {
        // the timer and observable is to immitate an actual network call
        return timer(200).pipe(
            map(() => model),
            take(1)
        );
    }
}

const model = {
    'Rocket league': {
        image_url: 'https://img.com/rocket_league',
        attributes: {
            rarity: ['exotic', 'rare', 'common'],
            category: ['wheels', 'explosions', 'antennas']
        },
        items: {
            'alpha reward wheels': {
                image_url: 'https://img.com/alpha_reward_wheels',
                attributes: {
                    rarity: 'exotic',
                    category: 'wheels'
                }
            },
            'ninja wheels': {
                image_url: 'https://img.com/ninja_wheels',
                attributes: {
                    rarity: 'rare',
                    category: 'wheels'
                }
            }
        }
    },
    CSGO: {
        image_url: 'https://img.com/csgo',
        attributes: {
            wear: ['factory new', 'minimal wear', 'battle scarred']
        },
        items: {
            'covert knife': {
                image_url: 'https://img.com/covert_knife',
                attributes: {
                    wear: 'minimal wear'
                }
            }
        }
    }
};
