import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-layout',
  templateUrl: './cart-layout.component.html',
  styleUrls: ['./cart-layout.component.css']
})
export class CartLayoutComponent {
  constructor(private cartService: CartService){}
}
