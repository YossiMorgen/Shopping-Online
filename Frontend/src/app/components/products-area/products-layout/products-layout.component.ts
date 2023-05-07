import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ) { }

  async ngOnInit(): Promise<void> {    
    try {
      this.route.queryParams.subscribe(async (params: any) => {
        
        this.productsService.isThereProducts = true;
        this.productsService.products = [];
        await this.productsService.getProducts(params);
        window.removeEventListener('scroll', ()=>{})
        window.addEventListener("scroll", async () => {

          if(
            this.productsService.isThereProducts &&
            this.router.url.search('products') !== -1 && 
            window.innerHeight + Math.round(window.scrollY) ===  document.body.offsetHeight 
          ){
            try {
              console.log("hi");

              await this.productsService.getProducts(params);
            } catch (error) {
              this.toast.error(error)
            } 
          } 
        })
      })
    } catch (error: any) {
      this.toast.error(error);
    }
  }
}
