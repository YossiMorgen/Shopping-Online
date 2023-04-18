import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnInit {

  constructor( public cartService : CartService ){}

  async ngOnInit(): Promise<void> {
    try {
      await this.cartService.getCart();
    } catch (error : any) {
      alert(error.message);
    }
  }

  public async deleteCartProducts(){
    try {
      await this.cartService.deleteAllProducts();
    } catch (error: any) {
      alert(error.message);
    }
  }

}
