import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/auth-models/user.model';
import Order from 'src/app/models/product-models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/oreder.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

type DeliveryDate = {
  deliveryDate: Date;
}
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public order : Order = new Order();
  public dates: DeliveryDate[] = [];
  
  public orderForm = this.formBuilder.group({
    city: ['', [Validators.required, Validators.minLength(2)]],
    street: ['', [Validators.required, Validators.minLength(2)]],
    deliveryDate: ['', [Validators.required]],
    creditCard: ['', [Validators.required, Validators.pattern('([1-9]{16})')]]
  })

  constructor ( 
    public auth : AuthService,
    private orderService : OrderService,
    private cartService : CartService,
    private router : Router,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      if(! this.cartService.cart || this.cartService.cart.ordered){
        await this.cartService.getCart();
      }
      if(!this.cartService.products.length){
        this.router.navigate(['/products']);
      }      
    } catch (error : any) {
      this.toast.error(error);
    }

    try {
      this.dates = await this.orderService.getBusyDates();
    } catch (error) {
      this.toast.error(error);
    }

  }

  public copyDefaultUserDetails(cell: 'city' | 'street'){    
    this.orderForm.get(cell).setValue(this.auth.user[cell])
  }

  public async makeAnOrder(){
    try {
      this.order = new Order({...this.orderForm.value, userID:  this.auth.user.userID, cartID:  this.cartService.cart.cartID, price: this.cartService.totalPrice })
      
      await this.orderService.makeAnOrder(this.order);

      this.router.navigate(['/receipt'])
    } catch (error: any) {
      this.toast.error(error);
    }
  }

  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    return (
      this.dates.findIndex(d => new Date(d.deliveryDate).toLocaleDateString() === new Date(day).toLocaleDateString()) === -1 && 
      new Date(day) > new Date()
    );
  };
}   