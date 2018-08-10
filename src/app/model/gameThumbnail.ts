export class GameThumbnail {
    urlName: string;
    link: string;

    constructor(public name: string, public image: string) {
        this.urlName = name.replace(' ', '-').toLowerCase();
        this.link = `/${this.urlName}`;
    }
}
