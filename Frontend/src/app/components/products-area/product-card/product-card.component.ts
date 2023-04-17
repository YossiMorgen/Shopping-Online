import { CartService } from 'src/app/services/cart.service';
import { Component, Input } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  
  public constructor( 
    private productsService: ProductsService,
    public auth : AuthService,
    public cartService : CartService
  ){}
  
  @Input()
  public product: ProductModel;

  public async deleteProduct(){
    try {
        
        if(!window.confirm('Are You Sure?')) return;
        await this.productsService.deleteProduct( this.product.productID )
        alert('Deleted!!!');

    } catch (error:any) {
        alert(error.message)
    }
  }

  public async addProductToCart() {
    try {
      console.log("hi");

      const productCart = new ProductCartModel()
      productCart.cartID = this.cartService.cart?.cartID;
      productCart.productID = this.product.productID;
      productCart.amount = 1;
      
      this.cartService.addProduct(productCart);

    } catch (error : any) {
      alert(error.message);
    }
  }
}