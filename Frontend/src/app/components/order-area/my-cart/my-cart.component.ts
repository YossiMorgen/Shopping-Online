import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  constructor (
    public cartService : CartService,
    private router : Router
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

    if(this.cartService.productsTotalPrice() === 0){
      this.router.navigate(['/products']);
    }
  }

}
