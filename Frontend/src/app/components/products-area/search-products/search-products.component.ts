import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private productsService : ProductsService,
    public router : Router,
    private cartService: CartService
  ) {}

  public async search () {
    try {
      console.log(this.router.url);
      if (this.router.url === '/order') {
        this.cartService.changeRegexSearch(this.input);
        return
      }      
      // this.router.navigate(['products'], {queryParams: {search: this.input}});
      await this.productsService.getProductsByName( this.input );
    } catch (error : any) {
      alert(error.message);
    }
  }
}
