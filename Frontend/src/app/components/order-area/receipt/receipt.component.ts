import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor (
    public cartService : CartService,
    private router : Router
  ) { }

  ngOnInit(): void {
    if(!this.cartService.products.length){
      this.router.navigate(['products']);
    }
  }
}
