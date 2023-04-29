import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    private cartService : CartService,
    private productsService : ProductsService,
    private auth: AuthService
  ){}

}