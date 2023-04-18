import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.css']
})
export class CartFooterComponent implements OnInit {
 
  constructor( public cartService : CartService ){}

  async ngOnInit(): Promise<void> {
    try {
      await this.cartService.getCart();
    } catch (error : any) {
      alert(error.message);
    }
  }

}
