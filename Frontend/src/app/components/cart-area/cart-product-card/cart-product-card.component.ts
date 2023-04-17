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

  public reduceQuantity(){
    try {
      
    } catch (error: any) {
      alert(error.message);
    }
  }

  public increaseQuantity(){
    try {
      
    } catch (error: any) {
      alert(error.message);
    }
  }

}
