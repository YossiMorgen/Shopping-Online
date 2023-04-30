import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

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
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    if(this.productsService.products.length){
      return ;
    }
    try {
      this.route.queryParams.subscribe(async (params: any) => {
        
        if(params.search){
          await this.productsService.getProductsByName(params.search);
          return ;
        }
        if(params.category_id){
          await this.productsService.getAllProductsByCategory(params.category_id);
          return ;
        }
        await this.productsService.getRandomProducts();
      })
    } catch (error: any) {
      alert(error.message);
    }

    try {
      await this.cartService.getCart();
    } catch (error: any) {
      alert(error.message);
    }
  }

}
