import { Component } from '@angular/core';
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
    if(!this.auth.user){
      return;
    }
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

}
