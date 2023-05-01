import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/auth-models/user.model';
import Order from 'src/app/models/product-models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/oreder.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public order : Order = new Order();

  constructor ( 
    private auth : AuthService,
    private orderService : OrderService,
    private cartService : CartService,
    private router : Router,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.cartService.getCart();
    } catch (error : any) {
      alert(error.message);
    }
  }

  public orderForm = this.formBuilder.group({
    city: ['', [Validators.required, Validators.minLength(2)]],
    street: ['', [Validators.required, Validators.minLength(2)]],
    deliveryDate: [Date, [Validators.required]],
    creditCard: ['', [Validators.required, Validators.pattern('([1-9]{4})')]]
  })
  public copyDefaultUserDetails(cell: 'city' | 'street'){
    console.log(cell);
    
    this.orderForm.get(cell).setValue(this.auth.user[cell])
  }

  public async makeAnOrder(){
    try {
      this.order.userID = this.auth.user.userID;
      this.order.cartID = this.cartService.cart.cartID;
      this.order.price = this.cartService.totalPrice;
      
      await this.orderService.makeAnOrder(this.order);

      this.router.navigate(['/receipt'])
    } catch (error: any) {
      this.toast.error(error);
    }
  }

}
