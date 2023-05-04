import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ProductModel from 'src/app/models/product-models/product.model';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{

  public products: ProductModel[] = this.productsService.products;

  constructor (
    public productsService : ProductsService, 
    public auth : AuthService,
    public router : Router,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService,
    public app : AppService

  ) {  }

}
