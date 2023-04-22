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

  public order : Order;

  constructor ( 
    private auth : AuthService,
    private orderService : OrderService
  ) { }

  public copyDefaultUserDetails(cell: 'city' | 'street'){
    this.order[cell] = this.auth.user[cell]
  }

  public async makeAnOrder(){
    try {
      await this.orderService.makeAnOrder(this.order);
    } catch (error: any) {
      alert(error.message);
    }
  }

}
