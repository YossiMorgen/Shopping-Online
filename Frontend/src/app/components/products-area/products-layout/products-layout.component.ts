import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-layout',
  templateUrl: './products-layout.component.html',
  styleUrls: ['./products-layout.component.css']
})
export class ProductsLayoutComponent {
  constructor(
    public auth : AuthService,
    public productsService : ProductsService
  ) { }

}
