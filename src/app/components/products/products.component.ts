import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { first, Observable } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, MatCard, MatCardContent, TranslateModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  public products$: Observable<IProduct[]> = new Observable<IProduct[]>();

  ngOnInit() {
    this.activatedRoute.params.pipe(first()).subscribe({
      next: (params: Params) => {
        const categoryId = params['categoryId'];
        this.products$ = this.productsService.getProducts(categoryId);
      }
    })
  }

}
