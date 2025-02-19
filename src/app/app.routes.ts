import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { PayOrderComponent } from './components/pay-order/pay-order.component';

export const routes: Routes = [
    { path: 'categories', component: CategoriesComponent },
    { path: 'products/:categoryId', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'pay-order', component: PayOrderComponent },
    { path: '**', redirectTo: 'categories' }
];
