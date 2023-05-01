import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public router : Router,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService

  ) {  }

  ngOnInit(): void {
    window.addEventListener("scroll", () => {

      if(this.productsService.isThereProducts && this.router.url.search('products') !== -1 && window.innerHeight + Math.round(window.scrollY) ===  document.body.offsetHeight ){
        try {
          this.route.queryParams.subscribe(async (params: any) => {
              this.productsService.getProducts(params);
          })
        } catch (error) {
          this.toast.error(error)
        } 
      } 
    })
  }
}
