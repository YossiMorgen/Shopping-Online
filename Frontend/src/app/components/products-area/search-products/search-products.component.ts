import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/oreder.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {

  constructor(
    public productsService : ProductsService,
    public router : Router,
    private cartService: CartService,
    public orderService : OrderService,
    private route: ActivatedRoute,
    private toast: ToastifyNotificationsService
  ) {}

  public async search (f : NgForm) {
    try {
      console.log(f.value['input']);
      const input = f.value['input'];
      if (this.router.url === '/order') {
        this.orderService.search = input;
        return
      }

      this.router.navigate(
        ['/products'],
        {queryParams: {search: input}}
      )
    } catch (error : any) {      
      this.toast.error(error)
    }
  }

  public visibility(): string | null {
    const url = this.router.url;
      
    if(url === '/order'){
      return 'order';
    }

    if (url.search('products') !== -1) {
      return 'products';
    }

    return null;
  }
}
