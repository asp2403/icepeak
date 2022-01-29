import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { FinalComponent } from './final/final.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'order', component: OrderFormComponent},
  { path: 'order-complete', component: OrderCompleteComponent },
  { path: 'final', component: FinalComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
