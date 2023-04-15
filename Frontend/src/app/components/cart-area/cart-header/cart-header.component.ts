import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent {

  constructor( public cartService : CartService ){}

  public async createNewCart(){
    try {
      await this.cartService.createCart();
    } catch (error: any) {
      alert(error.message);
    }
  }

  public async getCart(): Promise<void> {
    try {
      await this.cartService.getCart()
    } catch (error : any) {
      alert(error.message);
    }
  }
}
