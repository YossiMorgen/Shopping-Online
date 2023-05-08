import { Component } from '@angular/core';
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
    private toast: ToastifyNotificationsService

  ) { }

    async ngOnInit(): Promise<void> {
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

}
