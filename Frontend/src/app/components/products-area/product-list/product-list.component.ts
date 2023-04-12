import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public products: ProductModel[] = [];

  constructor (public productsService : ProductsService) {  }

  async ngOnInit(): Promise<void> {
    try {
      await this.productsService.getRandomProducts();
      this.products = this.productsService.products;
    } catch (error: any) {
      alert(error.message);
    }
  }
}
