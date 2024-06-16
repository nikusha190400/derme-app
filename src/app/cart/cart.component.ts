import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { CardComponent } from '../card/card.component';
import { ProductCard } from '../main/product';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, MainComponent, CardComponent, CommonModule], // Add CommonModule to imports
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {
  cart: ProductCard[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    if (isPlatformBrowser(this.platformId)) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  removeFromCart(product: ProductCard) {
    if (isPlatformBrowser(this.platformId)) {
      this.cart = this.cart.filter(item => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  increaseQuantity(product: ProductCard) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        this.cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }

  decreaseQuantity(product: ProductCard) {
    if (isPlatformBrowser(this.platformId)) {
      const index = this.cart.findIndex(item => item.id === product.id);
      if (index !== -1 && this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  checkout() {
    const cartContents = JSON.stringify(this.cart);
    const emailSubject = 'Checkout from your website';
    const emailBody = `Here is the cart contents: \n\n${cartContents}`;

    // Replace with your email address where you want to send the cart contents
    const recipientEmail = 'recipient@example.com';

    this.emailService.sendEmail(recipientEmail, emailSubject, emailBody).subscribe(
      () => {
        alert('Proceeding to checkout! Cart sent to your email.');
      },
      (error: any) => {
        console.error('Error sending email:', error);
        alert('Failed to send cart to your email. Please try again later.');
      }
    );
  }
}


// export class CartComponent implements OnInit {
//   cart: ProductCard[] = [];
  
//   constructor(@Inject(PLATFORM_ID) private platformId: object) {}

//   ngOnInit(): void {
//     this.getCart();
//   }


//   getCart() {
//     if (isPlatformBrowser(this.platformId)) {
//       this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     }
//   }

//   removeFromCart(product: ProductCard) {
//     if (isPlatformBrowser(this.platformId)) {
//       this.cart = this.cart.filter(item => item.id !== product.id);
//       localStorage.setItem('cart', JSON.stringify(this.cart));
//     }
//   }
//   increaseQuantity(product: ProductCard) {
//     if (isPlatformBrowser(this.platformId)) {
//       const index = this.cart.findIndex(item => item.id === product.id);
//       if (index !== -1) {
//         this.cart[index].quantity++;
//         localStorage.setItem('cart', JSON.stringify(this.cart));
//       }
//     }
//   }

//   decreaseQuantity(product: ProductCard) {
//     if (isPlatformBrowser(this.platformId)) {
//       const index = this.cart.findIndex(item => item.id === product.id);
//       if (index !== -1 && this.cart[index].quantity > 1) {
//         this.cart[index].quantity--;
//         localStorage.setItem('cart', JSON.stringify(this.cart));
//       }
//     }
//   }

//   getTotal(): number {
//     return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
//   }

//   checkout() {
//     // Implement checkout functionality here
//     alert('Proceeding to checkout!');
//   }
// }