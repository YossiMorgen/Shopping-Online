import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-products-layout',
  templateUrl: './products-layout.component.html',
  styleUrls: ['./products-layout.component.css']
})
export class ProductsLayoutComponent implements OnInit {
  constructor(
    public auth : AuthService,
    public productsService : ProductsService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService
  ) { }

  async ngOnInit(): Promise<void> {    
    try {
      this.route.queryParams.subscribe(async (params: any) => {

        this.productsService.products = [];
        
        this.productsService.getProducts(params);
      
      })
    } catch (error: any) {
      this.toast.error(error);
    }

    try {
      await this.cartService.getCart();
    } catch (error: any) {
      this.toast.error(error);
    }
  }

}
