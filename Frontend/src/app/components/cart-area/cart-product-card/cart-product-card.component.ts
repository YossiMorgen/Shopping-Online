import { CartService } from 'src/app/services/cart.service';
import { Component, Input } from '@angular/core';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.css']
})
export class CartProductCardComponent {

  
  @Input()
  public product: ProductCartModel;

  constructor(private cartService : CartService) { }

  public async reduceQuantity(){
    try {
      await this.cartService.reduceQuantity(this.product.cartProductID)
    } catch (error: any) {
      alert(error.message);
    }
  }

  public async increaseQuantity(){
    try {
      await this.cartService.addProduct(this.product)
    } catch (error: any) {
      alert(error.message);
    }
  }

}
