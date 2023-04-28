import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(
    private cartService : CartService,
    private productsService : ProductsService,
    private auth: AuthService
  ){}

  async ngOnInit(): Promise<void> {
    if(!this.auth.user){
      return;
    }
    try {
      await this.cartService.getCart();
      await this.productsService.getRandomProducts();
    } catch (error: any) {
      alert(error.message);
    }    
  }
}