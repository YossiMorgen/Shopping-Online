import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/oreder.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  constructor (
    public cartService : CartService,
    private router : Router,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    if(!this.cartService.products.length){
      try {
        this.cartService.getCart();
      } catch (error : any) {
        this.router.navigate(['/products']);
        alert(error.message);
      }
    }

    if(this.cartService.totalPrice === 0){
      this.router.navigate(['/products']);
    }
  }

  public markSearch(value: string): string{
    if(value.search(this.orderService.search) >= 0){
      
      const array = value.split(this.orderService.search)
      value = array.join(`<span class="highlighted-text">${this.orderService.search}</span>`)    
    
    }
    console.log(value);
    return value;
    
  }

}
