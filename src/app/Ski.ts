import { Product } from "./product";

export const PRODUCT_TYPE_SKI = 100;

export class Ski extends Product {

    constructor (id: number, model: string, vendor: string, price: number, description: string) {
        super();
        this.idProductType = PRODUCT_TYPE_SKI;
        this.id = id;
        this.model = model;
        this.vendor = vendor;
        this.price = price;
        this.description = description;
    }
    
}