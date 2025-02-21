import { Signal, signal, WritableSignal } from "@angular/core";
import { IQuantityProduct } from "./quantity-product.model";


export class Order {

    private _productsSignal: WritableSignal<IQuantityProduct[]> = signal<IQuantityProduct[]>([]);

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly();
    }

}