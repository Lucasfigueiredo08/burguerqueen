import { Injectable, Signal } from '@angular/core';
import { Order } from '../models/order.model';
import { IQuantityProduct } from '../models/quantity-product.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  private _order: Order = new Order();

  public productsSignals: Signal<IQuantityProduct[]> = this._order.productsSignal;

  constructor() { }
}
