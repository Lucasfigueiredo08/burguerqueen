import { Signal, signal, WritableSignal } from "@angular/core";
import { IQuantityProduct } from "./quantity-product.model";
import { IProduct } from "./product.model";


export class Order {

    private _productsSignal: WritableSignal<IQuantityProduct[]> = signal<IQuantityProduct[]>([]);

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly();
    }

    private searchProduct(product: IProduct) {
        return this._productsSignal().find((productQuantity: IQuantityProduct) => 
            JSON.stringify(product) === JSON.stringify(productQuantity.product));
    }

}