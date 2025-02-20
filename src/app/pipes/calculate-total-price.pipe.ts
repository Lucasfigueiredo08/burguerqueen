import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'calculateTotalPrice',
  standalone: true,
  pure: false
})
export class CalculateTotalPricePipe implements PipeTransform {

  transform(product: IProduct, quantity: number = 1): number {
    
    let priceProduct = product.price;

    if(product.extras) {

      priceProduct += product.extras.reduce( (acumulado, extra) => {
        return acumulado + extra.blocks.reduce( (blockAcumulado, block) => {
          const activeOption = block.options.find(option => option.activate);
          return blockAcumulado + (activeOption ? activeOption.price : 0);
        }, 0)
      }, 0)
    }

    const total = priceProduct * quantity;
    
    return +total.toFixed(2);
  }

}
