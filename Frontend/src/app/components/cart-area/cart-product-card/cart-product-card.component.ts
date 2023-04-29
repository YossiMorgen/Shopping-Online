import { CartService } from 'src/app/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.css']
})
export class CartProductCardComponent implements OnInit {

  public amount: number;
  
  @Input()
  public product: ProductCartModel;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.amount = this.cartService.products.find(product => product.productName === this.product.productName).amount || 0;
  }

  public async changeQuantity(amount: number) {
    try {
      console.log(amount);
      
      this.product.amount = amount;
      await this.cartService.changeProductAmount(this.product);
    } catch (error: any) {
      alert(error.message);
    }
  }

  public removeProduct( ){
    try {
      this.cartService.deleteProduct(this.product.cartProductID);
    } catch (error : any) {
      alert(error.message);
    }
  }

}
