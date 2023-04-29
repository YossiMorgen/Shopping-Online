import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-layout',
  templateUrl: './products-layout.component.html',
  styleUrls: ['./products-layout.component.css']
})
export class ProductsLayoutComponent implements OnInit {
  constructor(
    public auth : AuthService,
    public productsService : ProductsService,
    public cartService: CartService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.cartService.getCart();
    } catch (error: any) {
      alert(error.message);
    }
  }

}
