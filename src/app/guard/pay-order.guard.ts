import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserOrderService } from '../services/user-order.service';

export const payOrderGuard: CanActivateFn = (route, state) => {

  const userOrderServicee = inject(UserOrderService);
  
  return userOrderServicee.numProductsSignal() > 0;
};
