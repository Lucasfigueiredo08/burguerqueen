import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/category.model';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL_BASE = `${environment.urlServer}/v1/categories`; // URL to web api
  private http = inject(HttpClient);

  getCategories() {
    return this.http.get<ICategory[]>(this.URL_BASE).pipe(first());
  }
}
