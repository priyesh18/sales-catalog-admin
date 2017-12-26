export class Product {
    constructor(
        public id: string, 
        public company: string, 
        public type: string, 
        public subtype: string, 
        public price: number,
        public imageUrl: string) {}
}