import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-products-layout',
  templateUrl: './products-layout.component.html',
  styleUrls: ['./products-layout.component.css'],
  
})
export class ProductsLayoutComponent implements OnInit {
  constructor(
    public auth : AuthService,
    public productsService : ProductsService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService,
    public router : Router,
    private app : AppService
  ) { }

  async ngOnInit(): Promise<void> {    
    try {
      this.route.queryParams.subscribe(async (params: any) => {
        this.productsService.params = params;
        this.productsService.isThereProducts = true;
        this.productsService.products = [];
        await this.productsService.getProducts();
      })
    } catch (error: any) {
      this.toast.error(error);
    }

    // window.removeEventListener("scroll", this.addProducts, true)
    window.addEventListener("scroll", async () => {
      if(
        this.productsService.isThereProducts &&
        this.router.url.search('products') !== -1 && 
        !this.app.loading &&
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight
      ){
        try {
          await this.productsService.getProducts();
        } catch (error) {
          this.toast.error(error)
        } 
      } 
    });    
  }

  private async addProducts() {
    if(
      this.productsService.isThereProducts &&
      this.router.url.search('products') !== -1 && 
      window.innerHeight + Math.round(window.scrollY) ===  document.body.offsetHeight 
    ){
      try {
        await this.productsService.getProducts();
      } catch (error) {
        this.toast.error(error)
      } 
    } 
  }
}

