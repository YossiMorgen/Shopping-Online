import { CartService } from 'src/app/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.css']
})
export class CartProductCardComponent implements OnInit {

  public amount: number;
  
  @Input()
  public product: ProductCartModel;

  constructor(
    private cartService : CartService,
    private toast: ToastifyNotificationsService,
  ) { }

  ngOnInit(): void {
    this.amount = this.cartService.products.find(product => product.productName === this.product.productName).amount || 0;
  }

  public async changeQuantity(amount: number) {
    try {     
      this.product.amount = amount;
      await this.cartService.changeProductAmount(this.product);
    } catch (error: any) {
    this.toast.error(error);
    }
  }

  public removeProduct( ){
    try {
      this.cartService.deleteProduct(this.product.cartProductID);
    } catch (error : any) {
      this.toast.error(error);
    }
  }

}
