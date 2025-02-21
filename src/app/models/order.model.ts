import { computed, inject, Signal, signal, WritableSignal } from "@angular/core";
import { IQuantityProduct } from "./quantity-product.model";
import { IProduct } from "./product.model";
import { CalculateTotalPricePipe } from "../pipes/calculate-total-price.pipe";


export class Order {

    private _productsSignal: WritableSignal<IQuantityProduct[]> = signal<IQuantityProduct[]>([]);
    private _numProductsSignal: Signal<number> = computed(() => this.numProducts());
    private _totalOrderSignal: Signal<number> = computed(() => this.totalOrder());

    private calculateTotalPricePipe = inject(CalculateTotalPricePipe);

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly();
    }

    public get numProductsSignal(): Signal<number> {
        return this._numProductsSignal;
    }

    public get totalOrderSignal(): Signal<number> {
        return this._totalOrderSignal;
    }

    public addProduct(product: IProduct, quantity: number = 1) {
        const products = this._productsSignal();
        const productFound = this.searchProduct(product);

        if (productFound) {
            productFound.quantity += quantity;
        } else {
            products.push({
                product,
                quantity
            })
        }

        this._productsSignal.set([...products]);
    }

    public oneMoreProduct(product: IProduct) {

        const productFound = this.searchProduct(product);

        if(productFound) {
            productFound.quantity++;
            this._productsSignal.set([...this._productsSignal()]);
        }
    }

    public oneLessProduct(product: IProduct) {

        const productFound = this.searchProduct(product);

        if(productFound) {
            productFound.quantity--;            
            if(productFound.quantity == 0) {
                this.removeProduct(product);
            } else {
                this._productsSignal.set([...this._productsSignal()]);
            }
        }
    }

    private removeProduct(productRemove: IProduct) {
        this._productsSignal.update(products => products.filter(
              (productQuantity: IQuantityProduct) => JSON.stringify(productRemove) !== JSON.stringify(productQuantity.product)
            )
        )
    }

    private searchProduct(product: IProduct) {
        return this._productsSignal().find((productQuantity: IQuantityProduct) => JSON.stringify(product) === JSON.stringify(productQuantity.product));
    }

    private totalOrder() {
        return this._productsSignal().reduce(
            (acumulador: number, value: IQuantityProduct) => this.calculateTotalPricePipe.transform(value.product, value.quantity) + acumulador, 0)
    }

    private numProducts() {
        return this._productsSignal().reduce(
            (acumulado: number, value: IQuantityProduct) => value.quantity + acumulado, 0)
    }

}