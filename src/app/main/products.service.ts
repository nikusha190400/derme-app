import { Injectable } from '@angular/core';
import { ProductCard } from './product';
import { RouterLink, RouterModule, Router } from '@angular/router';
RouterModule
RouterLink

@Injectable({ providedIn: 'root' })
export class productService {
  products: ProductCard[] = [
    {
      name: 'როზმარინის ზეთი',
      imgSrc: '../assets/images/products/oil.png',
      price: 25,
      amount: 5,
      sale: true,
      desc: 'lorem ipsum',
      id: 1,
      quantity: 1,
      description: 'lorem ipsum'
    },
    {
      name: 'roller',
      imgSrc: '../assets/images/products/roller.png',
      price: 18,
      amount: 5,
      sale: false,
      desc: 'lorem ipsum',
      id: 2,
      quantity: 1,
      description: 'lorem ipsum'
    },
    {
      name: 'როზმარინის ზეთი',
      imgSrc: '../assets/images/products/oil.png',
      price: 29,
      amount: 5,
      sale: true,
      desc: 'lorem ipsum',
      id: 3,
      quantity: 1,
      description: 'lorem ipsum'
    },
  ];

  constructor() {}

  getProducts(): ProductCard[] {
    return this.products;
  }

//   getProductById(id: number): ProductCard {
//     return this.products.find(product => product.id === id);
//   }
  
  private cart: ProductCard[] = [];


  addToCart(product: ProductCard) {
    this.cart.push(product);
    this.saveCart();
    console.log(`${product.name} added to cart`);
  }

  getCart() {
    return this.cart;
  }

  private saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }
}

