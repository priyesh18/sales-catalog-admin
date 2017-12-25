export class Product {
    constructor(
        public id: number, 
        public company: string, 
        public type: string, 
        public subtype: string, 
        public price: number,
        public imageUrl: string) {}
}