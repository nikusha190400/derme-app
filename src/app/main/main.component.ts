import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { ProductCard } from './product';
import { FormsModule } from '@angular/forms';
import { productService } from './products.service'; // Ensure the service name starts with an uppercase letter

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, CardComponent, FormsModule, CommonModule, NgFor],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  products: ProductCard[] = [];
  filteredProducts: ProductCard[] = [];
  searchWord: string = '';
  saledProduct = "saled-product";
  showOnlySaledProducts: boolean = false;
  priceRange: { min: number; max: number } = { min: 0, max: 100 }; // Initial price range

  constructor(private productService: productService) {}

  ngOnInit() {
    this.products = this.productService.getProducts(); // Assuming getProducts() fetches products
    this.filteredProducts = this.products;
  }

  filter() {
    this.filteredProducts = this.products.filter(el =>
      (!this.showOnlySaledProducts || el.sale) &&
      (this.searchWord === '' || el.name.toLowerCase().includes(this.searchWord.toLowerCase())) &&
      (el.price >= this.priceRange.min && el.price <= this.priceRange.max)
    );
  }

  sales() {
    this.showOnlySaledProducts = !this.showOnlySaledProducts;
    this.filter();
  }

  getSaledProductClass(product: ProductCard): string {
    return product.sale ? 'saled-product' : '';
  }

  addToCart(product: ProductCard) {
    this.productService.addToCart(product);
  }
}