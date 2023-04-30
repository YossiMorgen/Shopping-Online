import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public products: ProductModel[] = this.productsService.products;

  constructor (
    public productsService : ProductsService, 
    public auth : AuthService
  ) {  }

  ngOnInit(): void {
    // window.addEventListener("scrollend", () => {
    //   console.log("sup?");
      
    // })
  }
  public getMoreProducts(){
    console.log("getMoreProducts");
    
    this.productsService.getProducts();
  }
}
