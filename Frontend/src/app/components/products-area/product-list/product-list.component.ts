import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ProductModel from 'src/app/models/product-models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public products: ProductModel[] = this.productsService.products;

  constructor (
    public productsService : ProductsService, 
    public auth : AuthService,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService

  ) {  }

  ngOnInit(): void {
    // window.addEventListener("scrollend", () => {
    //   console.log("sup?");
      
    // })
  }
  public getMoreProducts(){
    console.log("getMoreProducts");

    
  try {
    this.route.queryParams.subscribe(async (params: any) => {

        this.productsService.getProducts(params);
    })
  } catch (error) {
    
  }  }
}
