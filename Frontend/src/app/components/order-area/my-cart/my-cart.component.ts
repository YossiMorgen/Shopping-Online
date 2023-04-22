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
      console.log('Please select products first');
      this.router.navigate(['/products']);
    }
  }

}
