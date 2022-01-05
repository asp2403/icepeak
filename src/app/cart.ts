import { Product } from "./product";

export class CartItem {
    product: Product | null;

    quantity: number;

    constructor (product: Product | null) {
        this.product = product;
        this.quantity = 1;
    }
}

