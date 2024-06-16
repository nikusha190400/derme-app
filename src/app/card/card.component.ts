import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCard } from '../main/product'; // Correct import assuming you have a ProductCard interface
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import {  Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, RouterLink, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product!: ProductCard;
  @Input() addToCart!: (product: ProductCard) => void;  // Input for addToCart function
  @Output() addCart: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}


  viewDetails() {
    this.router.navigate(['/product', this.product.id]);
  }

  onAddCart(product: ProductCard) {
    let cart: ProductCard[] = JSON.parse(localStorage.getItem('cart') || '[]');

    
    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
     
      existingProduct.quantity += product.quantity;
    } else {
   
      cart.push(product);
    }

    console.log(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  onAddToCart() {
    this.onAddCart(this.product);
  }
}
