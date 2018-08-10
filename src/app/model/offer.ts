export class Offer {
    constructor(
        public name: string,
        public reputation: number,
        public time: number, // in minutes
        public price: number // in $
    ) {}
}
