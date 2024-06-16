import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CardComponent } from './card/card.component';
CardComponent

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: { title: 'მთავარი' },
    pathMatch: 'full'
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    data: { title: 'ჩვენს შესახებ' }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'ჩემი კალათა' }
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    data: { title: 'მიმოხილვა' }
  },
  { path: '**', redirectTo: '' } // Handle any other route by redirecting to the main component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
