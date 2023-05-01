import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/oreder.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

type Input = {
  input: string;
}

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {
  public input: string = '';
  constructor(
    public productsService : ProductsService,
    public router : Router,
    private cartService: CartService,
    public orderService : OrderService,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService
  ) {}

  public async search () {
    try {
      console.log(this.router.url);
      if (this.router.url === '/order') {
        this.orderService.search = this.input;
        return ;
      }      
      await this.productsService.getProductsByName( this.input );
    } catch (error : any) {
      console.log("hi");
      
      this.toast.error(error)
    }
  }

  public visibility(): string | null {
    
    if(this.router.url === '/order'){
      return 'order';
    }
    
    if (this.router.url.search('products') !== -1) {
      return 'products';
    }

    return null;
  }
}
