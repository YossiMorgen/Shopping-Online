import { Component } from '@angular/core';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(
    public cartService : CartService,
    private toast: ToastifyNotificationsService,
    private auth: AuthService
  ) { }
    
  async ngOnInit(): Promise<void> {
    if(this.auth.user){
      this.getCart();
    }
    this.auth.userChanges.subscribe(async () => {      
      this.getCart();
    })

  }

  public async getCart(){
    try {
      await this.cartService.getCart();
    } catch (error : any) {
      this.toast.error(error);
    }
  }

  public async deleteCartProducts(){
    try {
      await this.cartService.deleteAllProducts();
    } catch (error: any) {
      this.toast.error(error);
    }
  }

  public removeProduct(cartProductId: number ){
    try {
      this.cartService.deleteProduct(cartProductId);
    } catch (error : any) {
      this.toast.error(error);
    }
  }

  public async changeProductAmount( product: ProductCartModel, amount: number ) {
    try {
      product.amount = amount;
      await this.cartService.changeProductAmount(product)
    } catch (error) {
      this.toast.error(error);
    }
  }
}
