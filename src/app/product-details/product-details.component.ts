import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductCard } from '../main/product';
import { productService } from '../main/products.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterModule, CardComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'] // Corrected from 'styleUrl'
})
export class ProductDetailsComponent implements OnInit {
  product: ProductCard | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: productService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Convert id to number using +
      this.product = this.getProductById(productId);
    });
  }

  getProductById(id: number): ProductCard | null {
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem('cart');
      if (cartJson) {
        const cart: ProductCard[] = JSON.parse(cartJson);
        return cart.find(product => product.id === id) || null;
      }
    }
    return null;
  }
}
