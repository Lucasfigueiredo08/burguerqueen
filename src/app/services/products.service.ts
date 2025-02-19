import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL_BASE = `${environment.urlServer}/v1/products`;
  private http = inject(HttpClient);

  getProducts(categoryId: string) {
    return this.http.get<IProduct[]>(`${this.URL_BASE}/category/${categoryId}`).pipe(first());
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(`${this.URL_BASE}/${id}`).pipe(first());
  }

}
