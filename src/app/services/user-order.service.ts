import { Injectable, Signal } from '@angular/core';
import { Order } from '../models/order.model';
import { IQuantityProduct } from '../models/quantity-product.model';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  private _order: Order = new Order();

  public productsSignals: Signal<IQuantityProduct[]> = this._order.productsSignal;

  public addProduct(product: IProduct, quantity: number = 1) {
    this._order.addProduct(product, quantity);
  }
}
