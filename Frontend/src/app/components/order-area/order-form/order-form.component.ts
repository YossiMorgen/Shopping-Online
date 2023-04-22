import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';
import User from 'src/app/models/auth-models/user.model';
import Order from 'src/app/models/product-models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/oreder.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {

  public order : Order = new Order();

  constructor ( 
    private auth : AuthService,
    private orderService : OrderService,
    private cartService : CartService,
    private router : Router
  ) { }

  public copyDefaultUserDetails(cell: 'city' | 'street'){
    console.log(cell);
    
    this.order[cell] = this.auth.user[cell]
  }

  public async makeAnOrder(){
    try {
      this.order.userID = this.auth.user.userID;
      this.order.cartID = this.cartService.cart.cartID;
      this.order.price = this.cartService.productsTotalPrice();
      
      await this.orderService.makeAnOrder(this.order);

      this.router.navigate(['/receipt'])
    } catch (error: any) {
      alert(error.message);
    }
  }

}
